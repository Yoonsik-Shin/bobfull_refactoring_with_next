import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user.profile.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { UserProfileImg } from './entities/user.profile.img.entity';
import { FileService } from '../file/file.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/commons/utils/multer.options';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, UserProfileImg]),
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, //
    FileService,
    JwtAccessStrategy,
  ],
})
export class UsersModule {}
