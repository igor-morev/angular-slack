import {
  MessagesApiActions,
  selectMessagesEntities,
  selectSelectedChat,
} from '@angular-slack/data-access-messages';
import { ThreadApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, map, filter, concatMap } from 'rxjs';
import { ThreadsApiActions } from './threads.actions';

@Injectable()
export class ThreadsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  private threadApiService = inject(ThreadApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsApiActions.init),
      switchMap(() => this.threadApiService.getThreads()),
      switchMap((threads) => of(ThreadsApiActions.loadSuccess({ threads }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsApiActions.loadFailure({ error }));
      })
    )
  );

  loadThreadsMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsApiActions.loadSuccess),
      concatMap(({ threads }) =>
        threads.map((thread) =>
          MessagesApiActions.init({
            chatId: thread.chatId,
          })
        )
      )
    )
  );

  tryCreateOrUpdateThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesApiActions.sendSuccess),
      concatLatestFrom((action) => [
        this.store
          .select(selectMessagesEntities)
          .pipe(map((dictionary) => dictionary[action.message.chatId])),
        this.store.select(selectSelectedChat),
      ]),

      filter(([, repliedMessage]) => !!repliedMessage),
      map(([{ authors, messagesCount }, repliedMessage, selectedChat]) => {
        if (!repliedMessage!.thread) {
          return ThreadsApiActions.create({
            payload: {
              id: repliedMessage!.id,
              chatId: repliedMessage!.id,
              authors,
              parentChatName: selectedChat!.name,
              message: repliedMessage!,
              messagesCount,
            },
          });
        } else {
          return ThreadsApiActions.update({
            id: repliedMessage!.thread.id!,
            payload: {
              chatId: repliedMessage!.id,
              authors,
              messagesCount,
            },
          });
        }
      })
    )
  );

  updateRepliedMessageAfterThreadUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsApiActions.createSuccess, ThreadsApiActions.updateSuccess),
      map((action) => {
        const { message } = action.thread;
        return MessagesApiActions.update({
          id: message.id,
          chatId: message.chatId!,
          updateParams: {
            thread: action.thread,
          },
        });
      })
    )
  );

  createThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsApiActions.create),
      switchMap((action) => this.threadApiService.createThread(action.payload)),
      switchMap((thread) => of(ThreadsApiActions.createSuccess({ thread }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsApiActions.createFailure({ error }));
      })
    )
  );

  updateThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsApiActions.update),
      switchMap((action) =>
        this.threadApiService.updateThread(action.id, action.payload)
      ),
      switchMap((thread) => of(ThreadsApiActions.updateSuccess({ thread }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsApiActions.updateFailure({ error }));
      })
    )
  );
}
