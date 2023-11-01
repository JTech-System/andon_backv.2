import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/entities/user.entity';
import { PermissionService } from 'src/modules/permission/permission.service';
import { group } from 'console';

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
        user_id: logInDto.user_id,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });
    if (user) {
      if (await bcrypt.compare(logInDto.password, user.passwordHash)) {
        user = await this.usersService.findOne(user.id, {relations: ['groups']});
        let permissions = {permissions: await this.evaluateUserPermissions(user.id)};
        const payload = {
          user,
          permissions,
        };
        return {
          token: await this.jwtService.signAsync(payload),
          user,
          permissions,
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
        relations: ['groups'],
      });
      if (user) return user;
    } catch {}
    return null;
  }

  async evaluateUserPermissions(userId: string): Promise<any> {
  const user = await this.usersService.findOne(userId, {
    relations: ['roles', 'roles.permissions', 'roles.permissions.resources', 'groups']
  });

  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  const permissions = {
    permissions: {
      routes: {},
      fields: {},
      actions: {},
    }
  };

  for (const role of user.roles) {
    for (const permission of role.permissions) {
      for (const resource of permission.resources) {
        if (resource.type === 'route') {
          if (!permissions.permissions.routes[resource.name]) {
            permissions.permissions.routes[resource.name] = {};
          }
          permissions.permissions.routes[resource.name][permission.action] = true;
        } else if (resource.type === 'field') {
          if (!permissions.permissions.fields[resource.name]) {
            permissions.permissions.fields[resource.name] = {};
          }
          permissions.permissions.fields[resource.name][permission.action] = true;
        } else if (resource.type === 'action') {
          if (!permissions.permissions.actions[resource.name]) {
            permissions.permissions.actions[resource.name] = {};
          }
          permissions.permissions.actions[resource.name][permission.action] = true;
        }
      }
    }
  }

  return permissions.permissions;
}

}
