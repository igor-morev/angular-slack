import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './models';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  contacts: Map<string, Contact[]> = new Map([
    [
      '1',
      [
        {
          id: '1',
          name: 'Steve Jobs',
          chatId: '1',
        },
        {
          id: '2',
          name: 'Jeff Bezos',
          chatId: '4',
        },
        {
          id: '3',
          name: 'Bill Gates',
          chatId: '2',
        },
        {
          id: '4',
          name: 'Elon Musk',
          chatId: '3',
        },
        {
          id: '5',
          name: 'John Carmack',
          chatId: '5',
        },
      ] as Contact[],
    ],
  ]);

  getContacts(userId: string): Observable<Contact[]> {
    return of(this.contacts.get(userId)!);
  }
}
