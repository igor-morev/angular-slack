import { initMessages } from '@angular-slack/data-access-messages';
import { ThreadApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, tap } from 'rxjs';
import * as ThreadsActions from './threads.actions';

@Injectable()
export class ThreadsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  private threadApiService = inject(ThreadApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsActions.initThreads),
      switchMap(() => this.threadApiService.getThreads()),
      tap((threads) => {
        threads.forEach((thread) => {
          this.store.dispatch(
            initMessages({
              chatId: thread.chatId,
            })
          );
        });
      }),
      switchMap((threads) =>
        of(ThreadsActions.loadThreadsSuccess({ threads }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsActions.loadThreadsFailure({ error }));
      })
    )
  );

  createThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsActions.createThread),
      switchMap((action) => this.threadApiService.createThread(action.payload)),
      switchMap((thread) => of(ThreadsActions.createThreadSuccess({ thread }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsActions.createThreadFailure({ error }));
      })
    )
  );

  updateThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsActions.updateThread),
      switchMap((action) =>
        this.threadApiService.updateThread(action.id, action.payload)
      ),
      switchMap((thread) => of(ThreadsActions.updateThreadSuccess({ thread }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsActions.updateThreadFailure({ error }));
      })
    )
  );
}
