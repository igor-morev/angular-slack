import { User } from '@angular-slack/auth/data-access';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  readonly users: User[] = [
    {
      id: '1',
      username: 'Steve Jobs',
    },
    {
      id: '2',
      username: 'Jeff Bezos',
    },
    {
      id: '3',
      username: 'Bill Gates',
    },
    {
      id: '4',
      username: 'Elon Musk',
    },
    {
      id: '5',
      username: 'John Carmack',
    },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
