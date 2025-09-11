import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Case, CaseDocument } from './schema/case.schema';
import { Model } from 'mongoose';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CaseService {
  constructor(@InjectModel(Case.name) private caseModel: Model<CaseDocument>) {}

  async create(data: CreateCaseDto) {
    try {
      const newcase = await this.caseModel.create({ ...data });
      return {
        success: true,
        data: newcase,
        message: 'Case Created Successfully',
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

  async findByCategory(categoryId: string) {
    try {
      const caseList = await this.caseModel
        .find({ category: categoryId, is_deleted: false })
        .populate('category');

      return {
        success: true,
        data: caseList,
        message: 'Case list',
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

  async findOne(id: string) {
    try {
      const cases = await this.caseModel.findById(id).populate('category');
      return {
        success: true,
        message: 'Case found',
        data: cases,
      };
    } catch (error) {
      console.error('error finding Case', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Case not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching Case Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOnebySlug(slug: string) {
    try {
      const cases = await this.caseModel.findOne({ slug }).populate('category');
      return {
        success: true,
        message: 'Case found',
        data: cases,
      };
    } catch (error) {
      console.error('error finding Case', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Case not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching Case Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const caseList = await this.caseModel
        .find({ is_deleted: false })
        .populate('category');
      return {
        success: true,
        data: caseList,
        message: 'Element list',
      };
    } catch (error) {
      console.log(error);
      if (error.response.statusCode === 404) {
        throw new NotFoundException('No Cases Found');
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

  async updateOne(id: string, data: UpdateCaseDto) {
    try {
      const updatedCase = await this.caseModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true },
      );
      return {
        success: true,
        data: updatedCase,
        message: 'Case Updated',
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Case not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update Case',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
