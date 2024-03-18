import { AuthService } from '@angular-slack/auth/data-access';

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from './models';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private authService = inject(AuthService);

  get userId() {
    return this.authService.userId;
  }

  contacts: Map<string, Contact[]> = new Map([[this.userId, []]]);

  constructor(private readonly userApiService: UserApiService) {
    this.contacts.set(
      this.userId,
      this.userApiService.users
        .map(
          (user) =>
            ({
              id: user.id,
              name: user.username,
              chatId: user.id,
            } as Contact)
        )
        .slice(0, 15)
    );
  }

  getContacts(): Observable<Contact[]> {
    return of(this.contacts.get(this.userId)!);
  }
}
