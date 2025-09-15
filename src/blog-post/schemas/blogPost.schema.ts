import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import slugify from 'slugify';
import { Services } from 'src/services/schemas/services.schema';
import { User } from 'src/user/schemas/user.schemas';

export type BlogPostDocument = BlogPost & Document;

@Schema()
export class BlogPost {
  @Prop({ unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  short_description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: null })
  banner: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Services.name })
  category: Types.ObjectId;

  @Prop({ default: Date.now() })
  date_created: Date;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: null })
  date_published: Date;

  @Prop({ default: null })
  date_updated: Date;

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ default: null })
  date_deleted: Date;

  @Prop({ default: null })
  seo_title: string;

  @Prop({ default: null })
  seo_description: string;

  @Prop({ default: null })
  keywords: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

//Middleware for generating slug at save time
BlogPostSchema.pre('save', function (next) {
  // if (this.isModified('title')) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  // }
  next();
});

// For updateOne / findOneAndUpdate
BlogPostSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  const update: any = this.getUpdate();
  // if (update) {
  update.slug = slugify(update.title, { lower: true, strict: true });
  this.setUpdate(update);
  // }
  next();
});
