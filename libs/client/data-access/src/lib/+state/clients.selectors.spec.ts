import { ClientsEntity } from './clients.models';
import {
  clientsAdapter,
  ClientsPartialState,
  initialClientsState,
} from './clients.reducer';
import * as ClientsSelectors from './clients.selectors';

describe('Clients Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getClientsId = (it: ClientsEntity) => it.id;
  const createClientsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ClientsEntity);

  let state: ClientsPartialState;

  beforeEach(() => {
    state = {
      clients: clientsAdapter.setAll(
        [
          createClientsEntity('PRODUCT-AAA'),
          createClientsEntity('PRODUCT-BBB'),
          createClientsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialClientsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Clients Selectors', () => {
    it('selectAllClients() should return the list of Clients', () => {
      const results = ClientsSelectors.selectAllClients(state);
      const selId = getClientsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ClientsSelectors.selectEntity(state) as ClientsEntity;
      const selId = getClientsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectClientsLoaded() should return the current "loaded" status', () => {
      const result = ClientsSelectors.selectClientsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectClientsError() should return the current "error" state', () => {
      const result = ClientsSelectors.selectClientsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
