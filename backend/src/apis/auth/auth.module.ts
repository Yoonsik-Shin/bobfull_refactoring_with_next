import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserProfile } from '../users/entities/user.profile.entity';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh-strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-social-kako.strategy';
import { JwtNaverStrategy } from 'src/commons/auth/jwt-social-naver.strategy';
import { UserProfileImg } from '../users/entities/user.profile.img.entity';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, UserProfile, UserProfileImg]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, //
    UsersService,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
  ],
})
export class AuthModule {}
