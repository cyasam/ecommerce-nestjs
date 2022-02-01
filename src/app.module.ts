import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartItemController } from './cart-item/cart-item.controller';
import { CartItemService } from './cart-item/cart-item.service';
import { CartItemModule } from './cart-item/cart-item.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductsModule,
    CartModule,
    CartItemModule,
    UserModule,
  ],
  controllers: [AppController, CartItemController],
  providers: [AppService, CartItemService],
})
export class AppModule {}
