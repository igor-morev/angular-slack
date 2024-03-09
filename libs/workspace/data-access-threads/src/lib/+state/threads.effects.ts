import { MessagesApiActions } from '@angular-slack/data-access-messages';
import { ThreadApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, tap } from 'rxjs';
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
      tap((threads) => {
        threads.forEach((thread) => {
          this.store.dispatch(
            MessagesApiActions.init({
              chatId: thread.chatId,
            })
          );
        });
      }),
      switchMap((threads) =>
        of(ThreadsApiActions.loadSuccess({ threads }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsApiActions.loadFailure({ error }));
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
