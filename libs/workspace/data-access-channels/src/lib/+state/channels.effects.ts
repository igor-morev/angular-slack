import { ChannelApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ChannelsActions from './channels.actions';

@Injectable()
export class ChannelsEffects {
  private actions$ = inject(Actions);
  private channelApiService = inject(ChannelApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelsActions.initChannels),
      switchMap(() => this.channelApiService.getChannels()),
      switchMap((channels) =>
        of(ChannelsActions.loadChannelsSuccess({ channels }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ChannelsActions.loadChannelsFailure({ error }));
      })
    )
  );
}
