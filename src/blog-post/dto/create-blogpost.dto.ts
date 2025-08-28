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
  title: string;

  @IsNotEmpty()
  @IsString()
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
