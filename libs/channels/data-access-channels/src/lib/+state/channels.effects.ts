import { ChannelApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { ChannelsApiActions } from './channels.actions';

@Injectable()
export class ChannelsEffects {
  private actions$ = inject(Actions);
  private channelApiService = inject(ChannelApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelsApiActions.init),
      switchMap(() => this.channelApiService.getChannels()),
      switchMap((channels) => of(ChannelsApiActions.loadSuccess({ channels }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ChannelsApiActions.loadFailure({ error }));
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelsApiActions.create),
      switchMap((action) => this.channelApiService.createChannel(action)),
      switchMap((channel) => of(ChannelsApiActions.createSuccess({ channel }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ChannelsApiActions.createFailure({ error }));
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChannelsApiActions.update),
      switchMap((action) => this.channelApiService.updateChannel(action)),
      switchMap((channel) => of(ChannelsApiActions.updateSuccess({ channel }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ChannelsApiActions.updateFailure({ error }));
      })
    )
  );
}
