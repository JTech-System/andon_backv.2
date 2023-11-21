import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { User } from '@users/entities/user.entity';

interface UserRequest extends Request {
  user: ResponseUserDto;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  private readonly allowedIps = ['187.211.86.9', '192.168.0.160']; // Add your allowed IPs here

  async getUser(req: UserRequest): Promise<User> {
    const bearerToken = req.headers.authorization as undefined | string;
    const token = !!bearerToken ? bearerToken.replace('Bearer ', '') : null;
    const user = await this.authService.logged(token);
    return user;
  }

  async use(req: UserRequest, res: Response, next: NextFunction) {
    // IP Whitelisting
    const requestIp = req.ip || req.connection.remoteAddress;
    if (!this.allowedIps.includes(requestIp)) {
      res.status(403).send('Access denied');
      return;
    }

    // Existing authentication logic
    if (
      /^\/api\//.test(req.originalUrl) &&
      req.originalUrl != '/api/auth/log-in' &&
      !(
        req.originalUrl == '/api/incidents/categories' && req.method == 'GET'
      ) &&
      !(req.originalUrl == '/api/production-lines' && req.method == 'GET') &&
      !(req.originalUrl == '/api/incidents' && req.method == 'POST')
    ) {
      const user = await this.getUser(req);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        res.end();
      }
    } else if (req.originalUrl == '/api/incidents' && req.method == 'POST') {
      const user = await this.getUser(req);
      if (user) req.user = user;
      next();
    } else next();
  }
}
