import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantMenu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  resId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restaurantMenu)
  restaurant: Restaurant;
}
