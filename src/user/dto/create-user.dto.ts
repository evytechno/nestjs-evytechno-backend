import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  mail: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  refresh_token: string | null;
  @IsOptional()
  access_token: string | null;
}
