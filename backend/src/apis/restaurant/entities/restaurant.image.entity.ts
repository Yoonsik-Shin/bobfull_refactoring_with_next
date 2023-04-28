import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 2000 })
  image: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restaurantImage)
  restaurant: Restaurant;
}
