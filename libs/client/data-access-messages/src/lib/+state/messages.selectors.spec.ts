import { MessagesEntity } from './messages.models';
import {
  messagesAdapter,
  MessagesPartialState,
  initialMessagesState,
} from './messages.reducer';
import * as MessagesSelectors from './messages.selectors';

describe('Messages Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMessagesId = (it: MessagesEntity) => it.id;
  const createMessagesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MessagesEntity);

  let state: MessagesPartialState;

  beforeEach(() => {
    state = {
      messages: messagesAdapter.setAll(
        [
          createMessagesEntity('PRODUCT-AAA'),
          createMessagesEntity('PRODUCT-BBB'),
          createMessagesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialMessagesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Messages Selectors', () => {
    it('selectAllMessages() should return the list of Messages', () => {
      const results = MessagesSelectors.selectAllMessages(state);
      const selId = getMessagesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = MessagesSelectors.selectEntity(state) as MessagesEntity;
      const selId = getMessagesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectMessagesLoaded() should return the current "loaded" status', () => {
      const result = MessagesSelectors.selectMessagesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectMessagesError() should return the current "error" state', () => {
      const result = MessagesSelectors.selectMessagesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
