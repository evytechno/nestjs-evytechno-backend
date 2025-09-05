import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Services } from 'src/services/schemas/services.schema';

export type ElementDocument = Element & Document;
@Schema()
export class Element {
  @Prop({ required: true })
  name: string;

  @Prop({})
  title: string;

  @Prop({ default: null })
  icon: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: null })
  image: string;

  @Prop({ type: Types.ObjectId, ref: Services.name, required: true })
  service: Types.ObjectId;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: false })
  is_deleted: boolean;
}
export const ElementSchema = SchemaFactory.createForClass(Element);
