import { Injectable, NestMiddleware } from '@nestjs/common';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';

interface UserRequest extends Request {
  user: ResponseUserDto;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    if (
      /^\/api\//.test(req.originalUrl) &&
      req.originalUrl != '/api/auth/log-in'
      //&& !(req.originalUrl == '/api/users' && req.method == 'POST')
    ) {
      const bearerToken = req.headers.authorization as undefined | string;
      const token = !!bearerToken ? bearerToken.replace('Bearer ', '') : null;
      const user = await this.authService.logged(token);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        res.end();
      }
    } else next();
  }
}
