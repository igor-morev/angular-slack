import { createAction, props } from '@ngrx/store';
import { ClientsEntity } from './clients.models';

export const initClients = createAction('[Clients Page] Init');

export const loadClientsSuccess = createAction(
  '[Clients/API] Load Clients Success',
  props<{ clients: ClientsEntity[] }>()
);

export const loadClientsFailure = createAction(
  '[Clients/API] Load Clients Failure',
  props<{ error: any }>()
);

export const SelectClientSuccess = createAction(
  '[Clients/API] Select Client',
  props<{ clients: ClientsEntity[] }>()
);
