import { MessageApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, withLatestFrom } from 'rxjs';
import { selectAllMessages } from './messages.selectors';
import { MessagesApiActions, scrollToMessage } from './messages.actions';

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  private messageApiService = inject(MessageApiService);
  private store = inject(Store);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesApiActions.init),
      switchMap((action) =>
        this.messageApiService.getMessagesBy(action.chatId)
      ),
      switchMap((messages) => of(MessagesApiActions.loadSuccess({ messages }))),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesApiActions.loadFailure({ error }));
      })
    )
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesApiActions.send),
      switchMap((action) =>
        this.messageApiService.sendMessage(
          action.chatId,
          action.content,
          action.attachments
        )
      ),
      switchMap(({ data, messagesCount, authors }) =>
        of(
          MessagesApiActions.sendSuccess({
            message: data,
            messagesCount,
            authors,
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesApiActions.sendFailure({ error }));
      })
    )
  );

  updateMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesApiActions.update),
      switchMap((action) =>
        this.messageApiService.updateMessage(
          action.id,
          action.chatId,
          action.updateParams
        )
      ),
      switchMap((message) => of(MessagesApiActions.updateSuccess({ message }))),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesApiActions.updateFailure({ error }));
      })
    )
  );

  scrollToMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesApiActions.sendSuccess, MessagesApiActions.loadSuccess),
      withLatestFrom(this.store.select(selectAllMessages)),
      switchMap(([, messages]) =>
        of(scrollToMessage({ index: messages.length }))
      )
    )
  );
}
