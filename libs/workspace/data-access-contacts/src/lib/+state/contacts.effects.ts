import { ContactApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { ContactsApiActions } from './contacts.actions';

@Injectable()
export class ContactsEffects {
  private actions$ = inject(Actions);
  private contactApiService = inject(ContactApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsApiActions.init),
      switchMap(() => this.contactApiService.getContacts()),
      switchMap((contacts) => of(ContactsApiActions.loadSuccess({ contacts }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsApiActions.loadFailure({ error }));
      })
    )
  );
}
