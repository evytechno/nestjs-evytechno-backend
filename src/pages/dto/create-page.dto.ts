import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  image: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_published: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  is_deleted: boolean;
}
