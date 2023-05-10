import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @UseGuards(AuthGuard('myGuard'))
  fetchRestaurant(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.restaurantService.findAll({ page, limit });
  }

  @Get('/countAll')
  @UseGuards(AuthGuard('myGuard'))
  fetchRestaurantCount() {
    return this.restaurantService.countAll();
  }
}
