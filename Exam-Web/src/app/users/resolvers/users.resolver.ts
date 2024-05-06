import { ResolveFn } from '@angular/router';
import { User } from '../models/user.model';
import { inject } from '@angular/core';
import { UsersService } from '../users.service';

export const usersResolver: ResolveFn<User[]> = (route, state) => {
  return inject(UsersService).getUsers();
};
