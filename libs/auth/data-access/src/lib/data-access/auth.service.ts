import { User } from '@angular-slack/slack-api';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginCredentials } from './auth.model';

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

  getMe(): Observable<User> {
    return of({
      username: 'Igor M',
    } as User);
  }
}
