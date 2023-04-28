import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RestaurantImage } from './restaurant.image.entity';
import { RestaurantMenu } from './restaurant.menu.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(
    () => RestaurantMenu,
    (restaurantMenu) => restaurantMenu.restaurant,
  )
  restaurantMenu: RestaurantMenu[];

  @OneToMany(
    () => RestaurantImage,
    (restaurantImage) => restaurantImage.restaurant,
  )
  restaurantImage: RestaurantImage[];
}
