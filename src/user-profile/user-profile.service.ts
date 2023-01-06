import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user-profile.schema';
import { Model } from 'mongoose';
import { mealItem } from './dto/types';

@Injectable()
export class UserProfileService {
  constructor(@InjectModel('users') private UserModel: Model<UserDocument>) {}

  findById(userId: string) {
    return this.UserModel.findOne(
      { _id: userId },
      { name: 1, isAdmin: 1, orders: 1, saldo: 1, meals: 1, _id: 0 },
    );
  }

  findOne(email: string, UserPassword: string) {
    return this.UserModel.findOne(
      { email: email, password: UserPassword },
      { _id: 1, email: 1, name: 1, isAdmin: 1, orders: 1, saldo: 1, meals: 1 },
    );
  }

  findPassword(email: string) {
    return this.UserModel.findOne({ email: email }, { password: 1 });
  }

  updateOne(userId: string, meal: mealItem) {
    return this.UserModel.updateOne(
      { _id: userId },
      { $push: { meals: meal } },
    );
  }
}
