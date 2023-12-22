import { MessageApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as MessagesActions from './messages.actions';

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  private messageApiService = inject(MessageApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.initMessages),
      switchMap((action) =>
        this.messageApiService.getMessagesBy(action.chatId)
      ),
      switchMap((messages) =>
        of(MessagesActions.loadMessagesSuccess({ messages }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesActions.loadMessagesFailure({ error }));
      })
    )
  );
}
