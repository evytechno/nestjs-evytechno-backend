import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDto } from './create-blogpost.dto';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}
