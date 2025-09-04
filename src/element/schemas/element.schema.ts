import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Services } from 'src/services/schemas/services.schema';

export type ElementDocument = Element & Document;
@Schema()
export class Element {
  @Prop({ required: true })
  name: string;

  @Prop({})
  icon: string;

  @Prop({ required: true })
  description: string;

  @Prop({})
  image: string;

  @Prop({ type: Types.ObjectId, ref: Services.name, required: true })
  service: Types.ObjectId;
}
export const ElementSchema = SchemaFactory.createForClass(Element);
