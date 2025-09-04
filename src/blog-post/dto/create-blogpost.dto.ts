import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  content: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  short_description: string;

  @IsOptional()
  @IsMongoId()
  author: string;

  @IsOptional()
  @IsMongoId()
  category: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_published: boolean;
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_deleted: boolean;

  @IsOptional()
  @IsString()
  banner: string;

  @IsOptional()
  @IsString()
  seo_title: string;

  @IsOptional()
  @IsString()
  seo_description: string;

  @IsOptional()
  @IsString()
  keywords: string;

  @IsOptional()
  @IsDateString()
  date_published: Date;
}
