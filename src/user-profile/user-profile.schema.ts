import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { orders, mealItem, Cart } from './dto/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  meals: mealItem[];

  @Prop()
  saldo: number;

  @Prop()
  isAdmin: boolean;

  @Prop()
  orders: orders[];

  @Prop()
  cart: Cart[];

  @Prop()
  boyFriendName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
