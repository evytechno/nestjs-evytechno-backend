import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Error } from 'mongoose';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    try {
      const jwtFromDatabase = (
        await this.userService.findByUsername(payload.username)
      ).access_token;
      const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      if (jwtFromRequest === jwtFromDatabase) {
        return { userId: payload.sub, username: payload.username };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      // console.error('ERRORRRRRRR', error);
      if (error.status === 401) {
        throw new UnauthorizedException({
          message: 'Session Expired',
          error: error,
        });
      } else {
        throw new HttpException(
          { message: 'Server Error', error: error },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // return { userId: payload.sub, username: payload.username };
  }
}
