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
        name: 'SpaceX',
      } as Client,
    ]);
  }
}
