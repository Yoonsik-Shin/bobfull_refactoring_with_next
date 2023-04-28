import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { RestaurantMenu } from './entities/restaurant.menu.entity';
import { RestaurantImage } from './entities/restaurant.image.entity';

const restaurants = JSON.parse(fs.readFileSync('restaurant.json', 'utf-8'));
const restaurantMenu = JSON.parse(
  fs.readFileSync('restaurant.menu.json', 'utf-8'),
);
const restaurantImage = JSON.parse(
  fs.readFileSync('restaurant.image.json', 'utf-8'),
);
// console.log(restaurantMenu);
// console.log(restaurantImage);

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantMenu)
    private readonly restaurantMenuRepository: Repository<RestaurantMenu>,
    @InjectRepository(RestaurantImage)
    private readonly restaurantImageRepository: Repository<RestaurantImage>,
  ) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    return await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.restaurantMenu', 'restaurantMenu')
      .leftJoinAndSelect('restaurant.restaurantImage', 'restaurantImage')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
  }

  async countAll() {
    const result = await this.restaurantRepository.find();
    return result.length;
  }

  async insertData() {
    // await this.restaurantMenuRepository.save(menus);
    // await this.restaurantMenuRepository.save(restaurantMenu);
    // await this.restaurantImageRepository.save(restaurantImage);
    // await this.restaurantRepository.save(restaurants);
    // const images = await this.restaurantImageRepository.find();
    // images.map((el) => {
    //   el.restaurant = el.resId;
    // });
    // console.log(images);
    // await this.restaurantImageRepository.save(images);
    // const menus = await this.restaurantMenuRepository.find();
    // menus.map((el) => {
    //   el.restaurantId = el.resId;
    // });
    // console.log(menus);
  }
}
