import { Action } from '@ngrx/store';

import * as ClientsActions from './clients.actions';
import { ClientsEntity } from './clients.models';
import {
  ClientsState,
  initialClientsState,
  clientsReducer,
} from './clients.reducer';

describe('Clients Reducer', () => {
  const createClientsEntity = (id: string, name = ''): ClientsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Clients actions', () => {
    it('loadClientsSuccess should return the list of known Clients', () => {
      const clients = [
        createClientsEntity('PRODUCT-AAA'),
        createClientsEntity('PRODUCT-zzz'),
      ];
      const action = ClientsActions.loadClientsSuccess({ clients });

      const result: ClientsState = clientsReducer(initialClientsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = clientsReducer(initialClientsState, action);

      expect(result).toBe(initialClientsState);
    });
  });
});
