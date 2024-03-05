import { ThreadApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ThreadsActions from './threads.actions';

@Injectable()
export class ThreadsEffects {
  private actions$ = inject(Actions);
  private threadApiService = inject(ThreadApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThreadsActions.initThreads),
      switchMap(() => this.threadApiService.getThreads()),
      switchMap((threads) =>
        of(ThreadsActions.loadThreadsSuccess({ threads }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ThreadsActions.loadThreadsFailure({ error }));
      })
    )
  );
}
