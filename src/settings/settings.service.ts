import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Settings, SettingsDocument } from './schema/settings.schema';
import { Model } from 'mongoose';
import { UpdateSettingsDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}

  async findAll() {
    try {
      const setting = await this.settingsModel.findOne();
      console.log('Settings get', setting);

      if (setting) {
        return {
          success: true,
          data: setting,
          message: 'Setting Found',
        };
      } else {
        const settingDetail = await this.settingsModel.create({ title: '' });
        console.log('Settings detail', settingDetail);

        return {
          success: true,
          data: settingDetail,
          message: 'Setting created',
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOne(id: string, data: UpdateSettingsDto) {
    try {
      const updatedSettings = await this.settingsModel.findByIdAndUpdate(
        id,
        { ...data },
        { new: true, runValidators: true },
      );
      return {
        success: true,
        data: updatedSettings,
        message: 'Settings Updated',
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'Settings not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update Settings',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
