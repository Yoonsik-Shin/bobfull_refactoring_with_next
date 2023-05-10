import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantImage } from './entities/restaurant.image.entity';
import { RestaurantMenu } from './entities/restaurant.menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantMenu, RestaurantImage]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
