import { Product } from './schemas/product.schema';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') productId) {
    return this.productsService.getProductById(productId);
  }

  @Post()
  async createProduct(@Body() product: Product) {
    return this.productsService.createProduct(product);
  }

  @Patch(':id')
  updateProduct(@Param('id') productId, @Body() product: Product) {
    return this.productsService.updateProduct(productId, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId) {
    return this.productsService.deleteProduct(productId);
  }
}
