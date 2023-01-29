import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user.profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const userProfileSave = await this.userProfileRepository.save({});

    const userSave = await this.userRepository.save({
      email,
      password,
      userprofile: userProfileSave,
    });

    return userSave;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email } });
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
