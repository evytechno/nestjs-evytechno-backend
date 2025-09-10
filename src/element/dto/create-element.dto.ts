import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateElementDto {
  // @Transform(({ value }) => {
  //   console.log('NAME', value);

  //   return value?.trim();
  // })
  // @IsNotEmpty()
  @IsNotEmpty()
  // @IsString()
  @IsOptional()
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
