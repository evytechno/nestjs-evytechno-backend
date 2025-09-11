import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import slugify from 'slugify';
import { Services } from 'src/services/schemas/services.schema';

export type CaseDocument = Case & Document;
@Schema()
export class Case {
  @Prop({ unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Services.name, required: true })
  category: Types.ObjectId;

  @Prop({})
  skills: string;

  @Prop({})
  start_date: Date;

  @Prop({})
  end_date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const CaseSchema = SchemaFactory.createForClass(Case);

CaseSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
