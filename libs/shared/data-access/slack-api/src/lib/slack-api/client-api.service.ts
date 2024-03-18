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
        name: 'Company Name',
        logo: 'https://img.freepik.com/premium-vector/arrow-abstract-logotype-design_101884-606.jpg?w=1480',
      },
    ]);
  }
}
