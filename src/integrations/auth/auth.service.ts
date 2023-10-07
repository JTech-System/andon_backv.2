import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/entities/user.entity';
import { PermissionService } from 'src/modules/permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private permissionService: PermissionService,
  ) {}

  async logIn(logInDto: LogInDto): Promise<ResponseLogInDto> {
    const user = await this.usersService.findOneByEmail(logInDto.email, ['passwordHash']);
    
    if (!user || !(await bcrypt.compare(logInDto.password, user.passwordHash))) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const permissions = await this.evaluateUserPermissions(user.id);
    const payload = { user, permissions };

    return {
        token: await this.jwtService.signAsync(payload),
        user,
        permissions,
    };
}

async evaluateUserPermissions(userId: string): Promise<any> {
  const user = await this.usersService.findOne(userId, {
    relations: ['roles', 'roles.permissions',  'roles.permissions.resources']
  });

    if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.permissionService.evaluatePermissions(user.roles);
}


  async logged(token: string): Promise<User | null> {
    try {
      const payload = (await this.jwtService.verifyAsync(token)).user as User;
      const user = await this.usersService.findOneBy({
        where: {
          id: payload.id,
        },
      });
      if (user) return user;
    } catch {}
    return null;
  }

}
