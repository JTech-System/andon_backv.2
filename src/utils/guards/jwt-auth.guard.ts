// src/guards/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.headers.authorization.split(' ')[1];
      this.jwtService.verify(jwt);
      return true;
    } catch (e) {
      return false;
    }
  }
}
