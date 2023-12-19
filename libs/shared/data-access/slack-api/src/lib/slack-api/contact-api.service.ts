import { Injectable } from '@angular/core';
import { Contact } from './models';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  getContact(): Contact {
    return {
      name: 'John Frank',
      chatId: '121212',
    } as Contact;
  }
}
