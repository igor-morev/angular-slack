import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  getCurrent(): User {
    return {
      username: 'Igor M',
    } as User;
  }

  getUsers(): User[] {
    return [];
  }
}
