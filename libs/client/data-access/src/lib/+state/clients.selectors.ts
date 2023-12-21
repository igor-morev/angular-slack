import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CLIENTS_FEATURE_KEY,
  ClientsState,
  clientsAdapter,
} from './clients.reducer';

// Lookup the 'Clients' feature state managed by NgRx
export const selectClientsState =
  createFeatureSelector<ClientsState>(CLIENTS_FEATURE_KEY);

const { selectAll, selectEntities } = clientsAdapter.getSelectors();

export const selectClientsLoaded = createSelector(
  selectClientsState,
  (state: ClientsState) => state.loaded
);

export const selectClientsError = createSelector(
  selectClientsState,
  (state: ClientsState) => state.error
);

export const selectAllClients = createSelector(
  selectClientsState,
  (state: ClientsState) => selectAll(state)
);

export const selectClientsEntities = createSelector(
  selectClientsState,
  (state: ClientsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectClientsState,
  (state: ClientsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectClientsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
