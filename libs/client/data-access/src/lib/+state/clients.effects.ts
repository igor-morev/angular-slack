import { ClientApiService } from '@angular-slack/slack-api';
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ClientsActions from './clients.actions';

@Injectable()
export class ClientsEffects {
  private actions$ = inject(Actions);
  private clientApiService = inject(ClientApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientsActions.initClients),
      switchMap(() => this.clientApiService.getClients()),
      switchMap((clients) =>
        of(ClientsActions.loadClientsSuccess({ clients }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ClientsActions.loadClientsFailure({ error }));
      })
    )
  );
}
