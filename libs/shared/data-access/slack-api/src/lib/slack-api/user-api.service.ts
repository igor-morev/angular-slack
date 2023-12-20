import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  getCurrent(): Observable<User> {
    return of({
      username: 'Igor M',
    } as User);
  }

  getUsers(): Observable<User[]> {
    return of([]);
  }
}
