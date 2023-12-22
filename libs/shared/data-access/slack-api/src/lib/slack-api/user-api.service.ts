import { User } from '@angular-slack/auth/data-access';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  getUsers(): Observable<User[]> {
    return of([]);
  }
}
