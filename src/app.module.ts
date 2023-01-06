/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileModule } from './user-profile/user-profile.module';
import * as dotenv from 'dotenv';
//@ts-ignore
import { CorsMiddleware } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://kriguer:${process.env.API_PASSWORD}@anelim-db.eooq7rj.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserProfileModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
