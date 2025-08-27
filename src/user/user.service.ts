import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // CRUD
  //Create a new User or Register
  async create(data: CreateUserDto) {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const newUser = await this.userModel.create(data);
      return {
        success: true,
        data: newUser.toObject(),
        message: 'User created Successfully',
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        return {
          success: false,
          message: 'Validation Failed',
          error: `Invalid intput: ${validationErrors.join(', ')}`,
        };
      }

      //Duplicate user error
      if (error.errorResponse.code === 11000) {
        const duplicateField = Object.keys(error.errorResponse.keyPattern);
        return {
          success: false,
          message: 'User not created',
          error: `${duplicateField} already exists`,
        };
      }

      //Unexpected Error
      return {
        success: false,
        message: 'User not Created',
        error: 'An unexpected error occured',
      };
    }
  }

  // Retrieve a;; user data
  async findAll() {
    try {
      const userList = await this.userModel.find().lean();
      return { success: true, messasge: 'user list', data: userList };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Unable to Retrieve users',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Retrieve data od specific user by ID
  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).lean();
      return {
        success: true,
        message: 'user found',
        data: user,
      };
    } catch (error) {
      console.error('Error finding user', error);

      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'User not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching User Details',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Update data of Specific user by ID
  async updateOne(id: string, data: UpdateUserDto) {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      return {
        success: true,
        data: updatedUser,
        message: 'User Updated',
      };
    } catch (error) {
      console.error('Error updating user', error);

      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'User not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'Failed to Update User',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete specific User by ID
  async deleteOne(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);

      return {
        success: true,
        message: 'User Deleted',
      };
    } catch (error) {
      console.error('Error deleting user', error);
      if (error.name === 'CastError') {
        throw new NotFoundException({
          success: false,
          message: 'User not Found',
        });
      }
      throw new HttpException(
        {
          success: false,
          message: 'User not deleted',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieve User data by username used in Log in
  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username }).lean();
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }
    return user;
  }

  //Updating Refresh Token
  async updateRefreshToken(userId: string, token: string | null) {
    const hashedToken = token ? await bcrypt.hash(token, 10) : null;
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedToken,
    });
  }
}
