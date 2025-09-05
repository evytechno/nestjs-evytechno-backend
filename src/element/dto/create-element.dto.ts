import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateElementDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsMongoId()
  service: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_published: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_deleted: boolean;
}
