import { SetMetadata } from '@nestjs/common';

export const USERS_KEY = 'users';
export const Users = (...users: string[]) => SetMetadata(USERS_KEY, users);
