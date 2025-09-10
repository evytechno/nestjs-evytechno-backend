import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCaseDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsMongoId()
  category: string;

  @IsOptional()
  @IsString()
  skills: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsOptional()
  @IsDateString()
  start_date: Date;
  @IsOptional()
  @IsDateString()
  end_date: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_published: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_deleted: boolean;
}
