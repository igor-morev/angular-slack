import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginCredentials } from './auth.model';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: null | string = null;

  set authorized(token: null | string) {
    this.token = token;
  }

  get authorized() {
    return this.token;
  }

  login(loginCredentials: LoginCredentials): string {
    this.authorized = loginCredentials.userName;

    return loginCredentials.userName;
  }

  logout() {
    this.authorized = null;
  }

  readonly userId = '1';
  readonly userName = 'Igor Morev (Frontend Dev)';

  getMe(): Observable<User> {
    return of({
      username: this.userName,
      image:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    } as User);
  }
}
