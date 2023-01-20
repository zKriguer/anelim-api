import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { Cart, mealItem } from './dto/types';
import { Delete } from '@nestjs/common/decorators';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':userId')
  findById(@Param('userId') userId: string) {
    return this.userProfileService.findById(userId);
  }

  @Get(':email/:password')
  async findOne(
    @Param('email') email: string,
    @Param('password') UserPassword: string,
  ) {
    const user = await this.userProfileService.findOne(email, UserPassword);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  @Put('/meals/:userId')
  async insertMeal(@Param('userId') userId: string, @Body() meal: mealItem) {
    return this.userProfileService.insertMeal(userId, meal);
  }

  @Put('/cart/:userId')
  async updateCart(@Param('userId') userId: string, @Body() cartItem: Cart) {
    return this.userProfileService.updateCart(userId, cartItem);
  }

  @Delete('/cart/:userId/:cartItemId')
  async deleteCartItem(
    @Param('userId') userId: string,
    @Param('cartItemId') cartItemId: string,
  ) {
    return this.userProfileService.deleteCartItem(userId, cartItemId);
  }

  @Put('/cart/finish/:userId/')
  async finishBuyCart(
    @Param('userId') userId: string,
    @Body() cartItems: Cart[],
  ) {
    const user = await this.userProfileService.findById(userId);

    return this.userProfileService.finishBuyCart(
      userId,
      cartItems,
      user.boyFriendName,
    );
  }
}
