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

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, UserProfile]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, //
    UsersService,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
  ],
})
export class AuthModule {}
