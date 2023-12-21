import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './models';

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  getClients(): Observable<Client[]> {
    return of([
      {
        id: '1',
        ownerId: '23',
        name: 'SpaceX',
        logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ]);
  }
}
