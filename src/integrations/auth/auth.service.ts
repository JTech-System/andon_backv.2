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
    let user = await this.usersService.findOneBy({
      where: {
        email: logInDto.email,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });
    if (user) {
      if (await bcrypt.compare(logInDto.password, user.passwordHash)) {
        user = await this.usersService.findOne(user.id);        
        let permissions = {permissions: await this.evaluateUserPermissions(user.id)};
        const payload = {
          user,
          permissions
        };
        return {
          token: await this.jwtService.signAsync(payload),
          user,
          permissions
        };
      }
    }
    throw new UnauthorizedException();
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

  async evaluateUserPermissions(userId: string): Promise<any> {
    const user = await this.usersService.findOne(userId, {
      relations: ['roles', 'roles.permissions',  'roles.permissions.resources']
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permissions = {
      routes: {},
      fields: {},
      actions: {},
    };
    console.log(user.roles);
    for (const role of user.roles) {
      console.log(role.permissions);
      for (const permission of role.permissions) {
        console.log(permission.resources);
        for (const resource of permission.resources) {
          if (resource.type === 'route') {
            permissions.routes[resource.name] = {
              canAccess: permission.action.includes('canAccess'),
            };
          } else if (resource.type === 'field') {
            permissions.fields[resource.name] = {
              canRead: permission.action.includes('canRead'),
              canWrite: permission.action.includes('canWrite'),
            };
          } else if (resource.type === 'action') {
            permissions.actions[resource.name] = {
              canExecute: permission.action.includes('canExecute'),
            };
          }
        }
      }
    }

    return permissions;
  }
}
