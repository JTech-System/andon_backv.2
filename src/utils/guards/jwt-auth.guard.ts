import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const jwt = request.headers.authorization.split(' ')[1];
      const payload = this.jwtService.verify(jwt);

      if (!this.hasRequiredRoles(payload)) {
        throw new UnauthorizedException('You do not have the required roles');
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private hasRequiredRoles(payload: any): boolean {
    // Implement role verification logic based on the payload
    // ...
    return false;
  }
}
