import { ContactApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ContactsActions from './contacts.actions';

@Injectable()
export class ContactsEffects {
  private actions$ = inject(Actions);
  private contactApiService = inject(ContactApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.initContacts),
      switchMap(() => this.contactApiService.getContacts()),
      switchMap((contacts) =>
        of(ContactsActions.loadContactsSuccess({ contacts }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.loadContactsFailure({ error }));
      })
    )
  );

  loadContactByChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.loadContactByChatActions.loadContactByChat),
      switchMap((action) => this.contactApiService.getContactBy(action.chatId)),
      switchMap((contact) =>
        of(
          ContactsActions.loadContactByChatActions.loadContactByChatSuccess({
            contact,
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.loadContactsFailure({ error }));
      })
    )
  );
}
