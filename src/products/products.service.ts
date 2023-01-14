import { Injectable } from '@nestjs/common';
import { ProductDocument } from './products.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { productItem } from './dto/types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products') private ProductsModel: Model<ProductDocument>,
  ) {}

  create(product: productItem) {
    return this.ProductsModel.create(product);
  }

  findAll() {
    return this.ProductsModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: string) {
    return this.ProductsModel.deleteOne({ _id: id });
  }
}
