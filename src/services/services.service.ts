import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Services, ServicesDocument } from './schemas/services.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name) private servicesModel: Model<ServicesDocument>,
  ) {}

  async create(data: Partial<Services>) {
    try {
      const newServices = new this.servicesModel(data);
      await newServices.save();
      return {
        data: newServices,
        message: 'Service created Successfully',
      };
    } catch (error) {
      return {
        error: error,
        message: 'Service not Created',
      };
    }
  }
  async findAll() {
    try {
      const servicesList = await this.servicesModel.find();
      return { mesasge: 'service list', data: servicesList };
    } catch (error) {
      return {
        error: error,
        message: 'Errorrrrr',
      };
    }
  }
  async findOne(id: string) {
    try {
      const services = await this.servicesModel.findById(id).exec();
      return {
        message: 'service found',
        data: services,
      };
    } catch (error) {
      return {
        error: error,
        message: 'service not found',
      };
    }
  }

  async updateOne(id: string, data: Partial<Services>) {
    try {
      const updatedService = await this.servicesModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedService) {
        return {
          success: false,
          message: 'Service not found',
        };
      }

      return {
        success: true,
        data: updatedService,
        message: 'Service updated successfully',
      };
    } catch (error) {
      console.error('Error updating service:', error);

      return {
        success: false,
        message: 'Failed to update service',
      };
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
