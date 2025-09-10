import { Element, ElementDocument } from './schemas/element.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateElementDto } from './dto/create-element.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateElementDto } from './dto/update-element.dto';

@Injectable()
export class ElementService {
  constructor(
    @InjectModel(Element.name) private elementModel: Model<ElementDocument>,
  ) {}

  // to create a new element
  // async create(data: any) {
  //   console.log('data:>>', data);
  //   return data;
  // }

  async create(data: CreateElementDto) {
    try {
      const newElement = await this.elementModel.create({
        ...data,
      });
      return {
        success: true,
        data: newElement,
        message: 'Element Created Successfully',
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

  // Retreive specific element
  async findOne(id: any) {
    try {
      const element = await this.elementModel.findById(id);
      return {
        success: true,
        message: 'Element found',
        data: element,
      };
    } catch (error) {
      console.error('error finding element', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'element not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching element Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // retrieve by service

  async findByService(serviceId: string) {
    try {
      const elementList = await this.elementModel
        .find({ service: serviceId, is_deleted: false })
        .populate('service');

      return {
        success: true,
        data: elementList,
        message: 'Element list',
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        {
          sucess: false,
          message: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const elementList = await this.elementModel
        .find({ is_deleted: false })
        .populate('service');
      return {
        success: true,
        data: elementList,
        message: 'Element list',
      };
    } catch (error) {
      console.log(error);
      if (error.response.statusCode === 404) {
        throw new NotFoundException('No Elements Found');
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

  async updateOne(id: string, data: UpdateElementDto) {
    try {
      const updatedElement = await this.elementModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true },
      );
      return {
        success: true,
        data: updatedElement,
        message: 'Element Updated',
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Element not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update Element',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
