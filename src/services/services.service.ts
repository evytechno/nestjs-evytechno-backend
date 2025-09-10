import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Services, ServicesDocument } from './schemas/services.schema';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name) private servicesModel: Model<ServicesDocument>,
  ) {}

  async create(data: CreateServiceDto) {
    try {
      const newServices = await this.servicesModel.create({ ...data });

      return {
        success: true,
        data: newServices,
        message: 'Service created Successfully',
      };
    } catch (error) {
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
  async findAll() {
    try {
      const serviceList = await this.servicesModel
        .find({ is_deleted: false })
        .populate('elements', {
          path: 'elements',
          model: 'Element',
        });

      return {
        success: true,
        data: serviceList,
        message: 'Service list',
      };
    } catch (error) {
      console.log(error);
      if (error.response.statusCode === 404) {
        throw new NotFoundException('No Service Found');
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
  async findOne(id: string) {
    try {
      const service = await this.servicesModel
        .findById(id)
        .populate('elements', {
          path: 'elements',
          model: 'Element',
        });
      return {
        success: true,
        message: 'Service found',
        data: service,
      };
    } catch (error) {
      console.error('error finding service', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'service not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching service Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOne(id: string, data: UpdateServiceDto) {
    try {
      const updatedService = await this.servicesModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true },
      );
      return {
        success: true,
        data: updatedService,
        message: 'Service Data Updated',
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Service not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update Service',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string) {
    try {
      await this.servicesModel.findByIdAndDelete(id);
      return {
        message: 'Service Deleted',
      };
    } catch (error) {
      return {
        error: error,
        message: 'Service not deleted',
      };
    }
  }
}
