// title,mobile,email,logo.favicon,

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({})
  title: string;
  @Prop({})
  mobile: string;
  @Prop({})
  email: string;
  @Prop({})
  logo: string;
  @Prop({})
  favicon: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
