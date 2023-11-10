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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(logInDto: LogInDto): Promise<ResponseLogInDto> {
    let user = await this.usersService.findOneBy({
      where: {
        username: logInDto.username,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });
    if (user) {
      if (await bcrypt.compare(logInDto.password, user.passwordHash)) {
        user = await this.usersService.findOneBy({
          where: {
            id: user.id,
          },
          relations: ['groups'],
        });
        let permissions = {
          permissions: await this.evaluateUserPermissions(user.id),
        };
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
    const user = await this.usersService.findOneBy({
      where: {
        id: userId,
      },
      relations: [
        'roles',
        'roles.permissions',
        'roles.permissions.resources',
        'groups',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permissions = {
      permissions: {
        routes: {},
        fields: {},
        buttons: {},
        files: {},
        data: {},
        actions: {},
      },
    };

    for (const role of user.roles) {
      for (const permission of role.permissions) {
        for (const resource of permission.resources) {
          switch (resource.type) {
            case 'route':
              if (!permissions.permissions.routes[resource.name]) {
                permissions.permissions.routes[resource.name] = {};
              }
              permissions.permissions.routes[resource.name][permission.action] =
                true;
              break;
            case 'field':
              if (!permissions.permissions.fields[resource.name]) {
                permissions.permissions.fields[resource.name] = {};
              }
              permissions.permissions.fields[resource.name][permission.action] =
                true;
              break;
            case 'button':
              if (!permissions.permissions.buttons[resource.name]) {
                permissions.permissions.buttons[resource.name] = {};
              }
              permissions.permissions.buttons[resource.name][
                permission.action
              ] = true;
              break;
            case 'file':
              if (!permissions.permissions.files[resource.name]) {
                permissions.permissions.files[resource.name] = {};
              }
              permissions.permissions.files[resource.name][permission.action] =
                true;
              break;
            case 'data':
              if (!permissions.permissions.data[resource.name]) {
                permissions.permissions.data[resource.name] = {};
              }
              permissions.permissions.data[resource.name][permission.action] =
                true;
              break;
            case 'action':
              if (!permissions.permissions.actions[resource.name]) {
                permissions.permissions.actions[resource.name] = {};
              }
              permissions.permissions.actions[resource.name][
                permission.action
              ] = true;
              break;
            default:
              // Handle unknown resource types or log an error
              console.error(`Unknown resource type: ${resource.type}`);
          }
        }
      }
    }

    return permissions.permissions;
  }
}
