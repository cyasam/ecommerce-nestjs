import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getProducts() {
    return await this.productModel.find().exec();
  }

  async getProductById(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async createProduct(product: Product) {
    const newProduct = new this.productModel(product);

    return await newProduct.save();
  }

  async updateProduct(productId, product: Product) {
    return await this.productModel.findByIdAndUpdate(productId, product);
  }

  async deleteProduct(productId) {
    return await this.productModel.findByIdAndDelete(productId);
  }
}
