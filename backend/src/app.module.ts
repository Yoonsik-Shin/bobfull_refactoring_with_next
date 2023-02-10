import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { CommunityModule } from './apis/communities/community.module';
import { FileModule } from './apis/file/file.module';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    AuthModule,
    CommunityModule,
    FileModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'bobfull',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
