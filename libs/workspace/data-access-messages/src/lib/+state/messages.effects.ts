import { MessageApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, tap, withLatestFrom } from 'rxjs';
import * as MessagesActions from './messages.actions';
import { selectAllMessages } from './messages.selectors';

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  private messageApiService = inject(MessageApiService);
  private store = inject(Store);

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

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.sendMessage),
      switchMap((action) =>
        this.messageApiService.sendMessage(
          action.chatId,
          action.content,
          action.attachments
        )
      ),
      switchMap((message) =>
        of(MessagesActions.sendMessageSuccess({ message }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesActions.sendMessageFailure({ error }));
      })
    )
  );

  scrollToMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MessagesActions.sendMessageSuccess,
        MessagesActions.loadMessagesSuccess
      ),
      withLatestFrom(this.store.select(selectAllMessages)),
      switchMap(([, messages]) =>
        of(MessagesActions.scrollToMessage({ index: messages.length }))
      )
    )
  );
}
