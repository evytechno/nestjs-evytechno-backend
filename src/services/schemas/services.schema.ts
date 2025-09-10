import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ServicesDocument = Services & Document;
@Schema()
export class Services {
  @Prop({ required: true })
  name: string;

  @Prop({})
  icon: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  banner: string;

  @Prop({ default: '#ffffff' })
  color1: string;

  @Prop({ default: '#000000' })
  color2: string;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Element' }] })
  elements: Element[];

  // @Prop() //elements foreign key to be implemented
  // elements:
}
export const ServicesSchema = SchemaFactory.createForClass(Services);
