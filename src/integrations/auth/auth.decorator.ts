import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ResponseUserDto } from '@users/dto/response-user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ResponseUserDto | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
