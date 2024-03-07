import { createThread, updateThread } from '@angular-slack/data-access-threads';
import { MessageApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, tap, withLatestFrom, map } from 'rxjs';
import * as MessagesActions from './messages.actions';
import { selectAllMessages } from './messages.selectors';

import { selectSelectedChannelsEntity } from '@angular-slack/data-access-channels';
import { selectSelectedContactEntity } from '@angular-slack/data-access-contacts';

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
          action.attachments,
          action.parentChatId
        )
      ),
      switchMap((response) =>
        of(MessagesActions.sendMessageSuccess({ message: response.data }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesActions.sendMessageFailure({ error }));
      })
    )
  );

  updateMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.updateMessage),
      switchMap((action) =>
        this.messageApiService.updateMessage(
          action.id,
          action.chatId,
          action.updateParams
        )
      ),
      switchMap((message) =>
        of(MessagesActions.updateMessageSuccess({ message }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MessagesActions.updateMessageFailure({ error }));
      })
    )
  );

  sendThreadMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.sendThreadMessage),
      switchMap((action) =>
        this.messageApiService
          .sendMessage(
            action.parentMessage.id,
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
        of(MessagesActions.sendMessageSuccess({ message: response.data })).pipe(
          tap(() => {
            this.store.dispatch(
              MessagesActions.updateMessage({
                id: action.parentMessage.id,
                chatId: action.parentMessage.chatId!,
                updateParams: {
                  thread: {
                    messagesCount: response.chatCount,
                    authors: response.authors,
                  },
                },
              })
            );

            if (!action.threadId) {
              this.store.dispatch(
                createThread({
                  payload: {
                    id: action.parentMessage.id,
                    chatId: response.data.chatId,
                    authors: response.authors,
                    chatName: channel
                      ? channel.name
                      : contact
                      ? contact.name
                      : '',
                    message: action.parentMessage,
                  },
                })
              );
            } else {
              this.store.dispatch(
                updateThread({
                  id: action.threadId,
                  payload: {
                    chatId: response.data.chatId,
                    authors: response.authors,
                  },
                })
              );
            }
          })
        )
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
        MessagesActions.sendThreadMessageSuccess,
        MessagesActions.loadMessagesSuccess
      ),
      withLatestFrom(this.store.select(selectAllMessages)),
      switchMap(([, messages]) =>
        of(MessagesActions.scrollToMessage({ index: messages.length }))
      )
    )
  );
}
