import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pages, PagesDocument } from './schema/pages.schema';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Pages.name) private pagesModel: Model<PagesDocument>,
  ) {}

  async create(data: CreatePageDto) {
    try {
      const newPage = await this.pagesModel.create({
        ...data,
      });
      return {
        success: true,
        data: newPage,
        message: 'Page Created Successfully',
      };
    } catch (error) {
      console.error(error);

      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        throw new BadRequestException({
          success: false,
          message: 'Validation Failed',
          error: `Invalid intput: ${validationErrors.join(', ')}`,
        });
      } else {
        //Unexpected Error
        throw new HttpException(
          {
            success: false,
            message: 'Blog not Created',
            error: 'An unexpected error occured',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findOne(id: any) {
    try {
      const element = await this.pagesModel.findById(id);
      return {
        success: true,
        message: 'Page found',
        data: element,
      };
    } catch (error) {
      console.error('error finding page', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'page not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching page Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneBySlug(slug: any) {
    try {
      const element = await this.pagesModel.findOne({ slug });
      return {
        success: true,
        message: 'Page found',
        data: element,
      };
    } catch (error) {
      console.error('error finding page', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'page not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching page Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(limit?: number) {
    try {
      const pageList = await this.pagesModel.find({ is_deleted: false });
      if (limit) pageList.splice(limit);
      return {
        success: true,
        data: pageList,
        message: 'Page list',
      };
    } catch (error) {
      console.log(error);
      if (error.response.statusCode === 404) {
        throw new NotFoundException('No Pages Found');
      } else {
        throw new HttpException(
          {
            sucess: false,
            message: error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateOne(id: string, data: UpdatePageDto) {
    try {
      const updatedPage = await this.pagesModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true },
      );
      return {
        success: true,
        data: updatedPage,
        message: 'Page Updated',
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Page not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update Page',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
