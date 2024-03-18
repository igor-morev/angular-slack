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
      username: 'Benoit enzley',
    },
    {
      id: '2',
      username: 'Beverie Duncklee',
    },
    {
      id: '3',
      username: 'Mayor Howarth',
    },
    {
      id: '4',
      username: 'Nikolaos Olivazzi',
    },
    {
      id: '5',
      username: 'Hube Sambell',
    },
    {
      id: '6',
      username: 'Alvera Fackney',
    },
    {
      id: '7',
      username: 'Jimmy Guntrip',
    },
    {
      id: '8',
      username: 'Natividad Ingerman',
    },
    {
      id: '9',
      username: 'Knox Kleynermans',
    },
    {
      id: '10',
      username: 'Ethan Wigfall',
    },
    {
      id: '11',
      username: 'Spence Espasa',
    },
    {
      id: '12',
      username: 'Chariot Faustian',
    },
    {
      id: '13',
      username: 'Marlo Bunting',
    },
    {
      id: '14',
      username: 'Dorice Jacobsz',
    },
    {
      id: '15',
      username: 'Daffie Tumilson',
    },
    {
      id: '16',
      username: 'Maybelle Sheldrick',
    },
    {
      id: '17',
      username: 'Georgianna Dicky',
    },
    {
      id: '18',
      username: 'Lemar Mccaull',
    },
    {
      id: '19',
      username: 'Shirley Toderini',
    },
    {
      id: '20',
      username: 'Ellene Lightbown',
    },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
