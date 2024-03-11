import { ThreadsApiActions } from '@angular-slack/data-access-threads';
import { MessageApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, tap, withLatestFrom, map } from 'rxjs';
import { selectAllMessages } from './messages.selectors';

import { selectSelectedChannelsEntity } from '@angular-slack/data-access-channels';
import { selectSelectedContactEntity } from '@angular-slack/data-access-contacts';
import { MessagesApiActions, MessagesThreadApiActions, scrollToMessage } from './messages.actions';

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
      switchMap((messages) =>
        of(MessagesApiActions.loadSuccess({ messages }))
      ),
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
          action.attachments,
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
      switchMap((message) =>
        of(MessagesApiActions.updateSuccess({ message }))
      ),
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
          .sendMessage(
            action.message.id,
            action.content,
            action.attachments
          )
          .pipe(map((response) => ({ action, response })))
      ),
      withLatestFrom(
        this.store.select(selectSelectedChannelsEntity),
        this.store.select(selectSelectedContactEntity)
      ),
      switchMap(([{ action, response }, channel, contact]) =>
        of(MessagesApiActions.sendSuccess({ message: response.data })).pipe(
          tap(() => {
            if (action.message.thread) {
              this.store.dispatch(
                ThreadsApiActions.update({
                  id: action.message.thread.id!,
                  payload: {
                    chatId: response.data.chatId,
                    authors: response.authors,
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
                    chatName: channel
                      ? channel.name
                      : contact
                      ? contact.name
                      : '',
                    message: action.message,
                  },
                })
              );
            }


            this.store.dispatch(
              MessagesApiActions.update({
                id: action.message.id,
                chatId: action.message.chatId!,
                updateParams: {
                  thread: {
                    messagesCount: response.chatCount,
                    authors: response.authors,
                  },
                },
              })
            );
          })
        )
      ),

      catchError((error) => {
        console.error('Error', error);
        return of(MessagesApiActions.sendFailure({ error }));
      })
    )
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
