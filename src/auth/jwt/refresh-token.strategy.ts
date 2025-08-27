import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'refreshKey',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refresh_token =
      typeof req.headers['authorization'] === 'string' &&
      req.headers['authorization'].replace('Bearer', '').trim().trim();
    return {
      ...payload,
      refresh_token,
    };
  }
}
