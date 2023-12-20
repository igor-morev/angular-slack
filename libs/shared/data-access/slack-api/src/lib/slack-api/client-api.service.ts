import { Injectable } from '@angular/core';
import { Client } from './models';

@Injectable({
  providedIn: 'root',
})
export class ClientApiService {
  getClient(): Client {
    return {
      name: 'SpaceX',
    } as Client;
  }
}
