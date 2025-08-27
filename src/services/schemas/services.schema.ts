import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  image: string;
  // @Prop() //elements foreign key to be implemented
  // elements:
}
export const ServicesSchema = SchemaFactory.createForClass(Services);
