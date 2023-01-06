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
import { mealItem } from './dto/types';

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
  async updateOne(@Param('userId') userId: string, @Body() meal: mealItem) {
    return this.userProfileService.updateOne(userId, meal);
  }
}
