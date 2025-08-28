import { Transform } from 'class-transformer';
import {
  IsBoolean,
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

  @IsOptional()
  @IsMongoId()
  author: string;

  @IsOptional()
  @IsMongoId()
  category: string;

  @IsOptional()
  @IsBoolean()
  is_published: boolean;
}
