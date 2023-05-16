import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as mongoose from 'mongoose';
import { Connection } from 'typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { ChatsModule } from './apis/chats/chats.module';
import { CommunityModule } from './apis/communities/community.module';
import { Community } from './apis/communities/entities/community.entity';
import { FileModule } from './apis/file/file.module';
import { Restaurant } from './apis/restaurant/entities/restaurant.entity';
import { RestaurantImage } from './apis/restaurant/entities/restaurant.image.entity';
import { RestaurantMenu } from './apis/restaurant/entities/restaurant.menu.entity';
import { RestaurantModule } from './apis/restaurant/restaurant.module';
import { RestaurantService } from './apis/restaurant/restaurant.service';
import { User } from './apis/users/entities/user.entity';
import { UserProfile } from './apis/users/entities/user.profile.entity';
import { UserProfileImg } from './apis/users/entities/user.profile.img.entity';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CommunityModule,
    FileModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        name: 'default',
        type: process.env.DATABASE_TYPE || 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        // entities: [__dirname + '/apis/**/*.entity.*'],
        entities: [
          User,
          UserProfile,
          UserProfileImg,
          Restaurant,
          RestaurantMenu,
          RestaurantImage,
          Community,
        ],
        keepConnectionAlive: true,
        synchronize: false,
        logging: true,
      }),
    }),
    RestaurantModule,
    TypeOrmModule.forFeature([Restaurant, RestaurantMenu, RestaurantImage]),
    ChatsModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [RestaurantService],
})
export class AppModule {
  constructor(
    private readonly restaurantService: RestaurantService,
    private connection: Connection,
  ) {
    this.restaurantService.insertData();
  }

  async onModuleDestroy() {
    await this.connection.close();
  }

  configure() {
    mongoose.set('debug', true);
  }
}
