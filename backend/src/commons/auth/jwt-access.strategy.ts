import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { UserProfile } from 'src/apis/users/entities/user.profile.entity';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  constructor(
    @InjectRepository(User)
    private readonly userRepositiory: Repository<User>,

    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }

  async validate(payload) {
    const { email } = payload;
    const user = await this.userRepositiory.findOne({
      relations: ['userprofile'],
      where: { email },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
