
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/entities/user.entity';
import { mockedJwtService } from '../../test/mocks/jwt.service';

describe('AuthService', () => {
  let service: AuthService;
  let findUser: jest.Mock;

  beforeEach(async () => {
    findUser = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: findUser,
          },
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when logging in', () => {
    describe('and the user is not found', () => {
      beforeEach(() => {
        findUser.mockReturnValue(undefined);
      });

      it('should throw an error', async () => {
        await expect(
          service.logIn({ email: 'test@test.com', password: 'test' }),
        ).rejects.toThrow();
      });
    });

    describe('and the password is not valid', () => {
      beforeEach(() => {
        findUser.mockReturnValue({
          passwordHash: 'wrongpassword',
        });
      });

      it('should throw an error', async () => {
        await expect(
          service.logIn({ email: 'test@test.com', password: 'test' }),
        ).rejects.toThrow();
      });
    });

    describe('and the user is found and password is valid', () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        findUser.mockReturnValue(user);
        user.passwordHash = 'test';
      });

      it('should return a user object', async () => {
        const loginData = { email: 'test@test.com', password: 'test' };
        await expect(service.logIn(loginData)).resolves.toBeDefined();
      });
    });
  });
});
