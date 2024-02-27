import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './models';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private authService = inject(AuthService);

  get userId() {
    return this.authService.userId;
  }

  contacts: Map<string, Contact[]> = new Map([
    [
      this.userId,
      [
        {
          id: uuidv4(),
          name: 'Steve Jobs',
          chatId: '1',
        },
        {
          id: uuidv4(),
          name: 'Jeff Bezos',
          chatId: '4',
        },
        {
          id: uuidv4(),
          name: 'Bill Gates',
          chatId: '2',
        },
        {
          id: uuidv4(),
          name: 'Elon Musk',
          chatId: '3',
        },
        {
          id: uuidv4(),
          name: 'John Carmack',
          chatId: '5',
        },
      ] as Contact[],
    ],
  ]);

  getContacts(): Observable<Contact[]> {
    return of(this.contacts.get(this.userId)!);
  }
}
