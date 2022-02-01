import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  price: number;

  @Prop({ required: true, trim: true })
  currency: string;

  @Prop({ required: true, trim: true })
  image_url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
