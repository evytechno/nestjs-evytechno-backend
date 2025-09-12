import { Transform } from 'class-transformer';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class FindBlogPostDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsMongoId()
  author: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  date_published: Date;

  @IsOptional()
  @IsMongoId()
  category: string;
}
