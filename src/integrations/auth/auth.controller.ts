import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { LogInDto } from './dto/log-in.dto';
import { ResponseUserDto } from '@users/dto/response-user.dto';
import { CurrentUser } from './auth.decorator';
import { User } from '@users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @ApiCreatedResponse({
    type: ResponseLogInDto,
  })
  async logIn(@Body() logInDto: LogInDto): Promise<ResponseLogInDto> {
    return await this.authService.logIn(logInDto);
  }

  @Get('logged')
  @ApiOkResponse({
    type: ResponseUserDto,
  })
  @ApiBearerAuth()
  async logged(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}
