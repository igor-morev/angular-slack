import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  getUsers(): Observable<User[]> {
    return of([]);
  }
}
