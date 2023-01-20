import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user-profile.schema';
import mongoose, { Model } from 'mongoose';
import { Cart, mealItem } from './dto/types';

@Injectable()
export class UserProfileService {
  constructor(@InjectModel('users') private UserModel: Model<UserDocument>) {}

  findById(userId: string) {
    return this.UserModel.findOne(
      { _id: userId },
      {
        name: 1,
        isAdmin: 1,
        orders: 1,
        saldo: 1,
        meals: 1,
        _id: 1,
        cart: 1,
        boyFriendName: 1,
      },
    );
  }

  findOne(email: string, UserPassword: string) {
    return this.UserModel.findOne(
      { email: email, password: UserPassword },
      {
        _id: 1,
        email: 1,
        name: 1,
        isAdmin: 1,
        orders: 1,
        saldo: 1,
        meals: 1,
        cart: 1,
      },
    );
  }

  findPassword(email: string) {
    return this.UserModel.findOne({ email: email }, { password: 1 });
  }

  insertMeal(userId: string, meal: mealItem) {
    this.UserModel.updateOne({ _id: userId }, { $push: { meals: meal } });
    if (meal.isHealthy === true) {
      return this.UserModel.updateOne({ _id: userId }, { $inc: { saldo: 5 } });
    } else
      return this.UserModel.updateOne({ _id: userId }, { $inc: { saldo: 3 } });
  }

  updateCart(userId: string, cartItem: Cart) {
    return this.UserModel.updateOne(
      { _id: userId },
      { $push: { cart: cartItem } },
    );
  }

  deleteCartItem(userId: string, cartItemId: string) {
    return this.UserModel.updateOne(
      { _id: userId },
      { $pull: { cart: { id: cartItemId } } },
    );
  }

  async finishBuyCart(
    userId: string,
    cartItems: Cart[],
    boyFriendName: string,
  ) {
    for (const cartItem of cartItems) {
      await this.UserModel.updateOne(
        { _id: userId },
        { $inc: { saldo: -cartItem.price } },
      );
    }

    const ObjectId = new mongoose.Types.ObjectId();

    await this.UserModel.updateMany(
      { $or: [{ _id: userId }, { name: boyFriendName }] },
      {
        $push: {
          orders: { idPedido: ObjectId, pedidos: cartItems },
        },
      },
    );

    await this.UserModel.updateMany(
      { _id: userId },
      {
        $set: { cart: [] },
      },
    );
  }
}
