import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './models';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private authService = inject(AuthService);

  contacts: Map<string, Contact[]> = new Map([
    [
      this.authService.userId,
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

  getContacts(): Observable<Contact[]> {
    return of(this.contacts.get(this.authService.userId)!);
  }
}
