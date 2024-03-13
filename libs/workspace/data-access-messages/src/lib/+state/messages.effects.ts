import { ThreadsApiActions } from '@angular-slack/data-access-threads';
import { MessageApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, tap, withLatestFrom, map } from 'rxjs';
import { selectAllMessages } from './messages.selectors';
import {
  MessagesApiActions,
  MessagesThreadApiActions,
  scrollToMessage,
} from './messages.actions';

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
      switchMap((response) =>
        of(MessagesApiActions.sendSuccess({ message: response.data }))
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

  sendThreadMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesThreadApiActions.send),
      switchMap((action) =>
        this.messageApiService
          .sendMessage(action.message.id, action.content, action.attachments)
          .pipe(map((response) => ({ action, response })))
      ),
      switchMap(({ action, response }) =>
        of(
          MessagesThreadApiActions.sendSuccess({ message: response.data })
        ).pipe(
          tap(() => {
            if (action.message.thread) {
              this.store.dispatch(
                ThreadsApiActions.update({
                  id: action.message.thread.id!,
                  payload: {
                    chatId: response.data.chatId,
                    authors: response.authors,
                    messagesCount: response.chatCount,
                  },
                })
              );
            } else {
              this.store.dispatch(
                ThreadsApiActions.create({
                  payload: {
                    id: action.message.id,
                    chatId: response.data.chatId,
                    authors: response.authors,
                    chatName: action.chatName,
                    message: action.message,
                    messagesCount: response.chatCount,
                  },
                })
              );
            }
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesThreadApiActions.sendFailure({ error }));
      })
    )
  );

  updateRepliedMessageAfterThreadUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ThreadsApiActions.createSuccess,
          ThreadsApiActions.updateSuccess
        ),
        tap((data) => {
          const { message } = data.thread;
          this.store.dispatch(
            MessagesApiActions.update({
              id: message.id,
              chatId: message.chatId!,
              updateParams: {
                thread: data.thread,
              },
            })
          );
        })
      ),
    { dispatch: false }
  );

  scrollToMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MessagesApiActions.sendSuccess,
        MessagesThreadApiActions.sendSuccess,
        MessagesApiActions.loadSuccess
      ),
      withLatestFrom(this.store.select(selectAllMessages)),
      switchMap(([, messages]) =>
        of(scrollToMessage({ index: messages.length }))
      )
    )
  );
}
