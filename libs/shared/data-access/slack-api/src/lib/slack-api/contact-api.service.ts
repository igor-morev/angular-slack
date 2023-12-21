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
          name: 'Steve Jobs',
          chatId: '1',
        } as Contact,
      ],
    ],
  ]);

  getContacts(userId: string): Observable<Contact[]> {
    return of(this.contacts.get(userId)!);
  }
}
