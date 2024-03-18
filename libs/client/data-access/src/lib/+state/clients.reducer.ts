import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ClientsEntity } from './clients.models';
import {
  initClients,
  loadClientsSuccess,
  loadClientsFailure,
} from './clients.actions';

export const CLIENTS_FEATURE_KEY = 'clients';

export interface ClientsState extends EntityState<ClientsEntity> {
  selectedId?: string; // which Clients record has been selected
  loaded: boolean; // has the Clients list been loaded
  error?: string | null; // last known error (if any)
}

export interface ClientsPartialState {
  readonly [CLIENTS_FEATURE_KEY]: ClientsState;
}

export const clientsAdapter: EntityAdapter<ClientsEntity> =
  createEntityAdapter<ClientsEntity>();

export const initialClientsState: ClientsState = clientsAdapter.getInitialState(
  {
    selectedId: '1',
    loaded: false,
  }
);

const reducer = createReducer(
  initialClientsState,
  on(initClients, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(loadClientsSuccess, (state, { clients }) =>
    clientsAdapter.setAll(clients, { ...state, loaded: true })
  ),
  on(loadClientsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function clientsReducer(
  state: ClientsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
