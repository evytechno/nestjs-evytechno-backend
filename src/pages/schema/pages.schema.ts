import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import slugify from 'slugify';

export type PagesDocument = Pages & Document;

@Schema()
export class Pages {
  @Prop({ unique: true })
  slug: string;

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

PagesSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
