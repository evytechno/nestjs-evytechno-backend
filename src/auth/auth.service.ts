import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { Error } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(data: LoginUserDto) {
    try {
      const user = await this.userService.findByUsername(data.username);
      if (!(await bcrypt.compare(data.password, user.password))) {
        throw new UnauthorizedException({ mesasge: 'Invalid Credentials' });
      }
      const { password, ...result } = user.toObject ? user.toObject() : user;

      const payload = { username: result.username, sub: result._id };
      const access_token = this.jwtService.sign(payload, { expiresIn: '30m' });
      const refresh_token = this.jwtService.sign(payload, {
        expiresIn: '2d',
      });
      await this.userService.updateRefreshToken(
        (user._id as any).toHexString(),
        refresh_token,
      );
      return {
        success: true,
        user: result,
        access_token: access_token,
      };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException({
          success: false,
          message: 'User not found',
        });
      }
      if (error.status === 401) {
        throw new HttpException(
          {
            success: false,
            message: 'Invalid Credentials',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            success: false,
            error: error,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async logout(id: string) {
    try {
      const user = await this.userService.updateRefreshToken(id, null);
      return {
        success: true,

        message: 'user logged out',
      };
    } catch (error) {
      if (error.response.error.status === 404) {
        throw new NotFoundException('User Not Found');
      } else {
        throw new HttpException(
          { success: false, error: error },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
