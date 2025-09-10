import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PagesDocument = Pages & Document;

@Schema()
export class Pages {
  @Prop({ require: true })
  name: string;

  @Prop({})
  title: string;
  @Prop({})
  image: string;
  @Prop({})
  description: string;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const PagesSchema = SchemaFactory.createForClass(Pages);
