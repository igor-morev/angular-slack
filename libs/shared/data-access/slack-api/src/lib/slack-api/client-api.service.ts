import { Injectable } from '@angular/core';
import { Client } from './models';

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  getClient(): Client {
    return {
      name: 'My company',
    } as Client;
  }
}
