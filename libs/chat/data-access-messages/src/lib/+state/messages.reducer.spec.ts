import { Action } from '@ngrx/store';

import * as MessagesActions from './messages.actions';
import { MessagesEntity } from './messages.models';
import {
  MessagesState,
  initialMessagesState,
  messagesReducer,
} from './messages.reducer';

describe('Messages Reducer', () => {
  const createMessagesEntity = (id: string, name = ''): MessagesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Messages actions', () => {
    it('loadMessagesSuccess should return the list of known Messages', () => {
      const messages = [
        createMessagesEntity('PRODUCT-AAA'),
        createMessagesEntity('PRODUCT-zzz'),
      ];
      const action = MessagesActions.loadMessagesSuccess({ messages });

      const result: MessagesState = messagesReducer(
        initialMessagesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = messagesReducer(initialMessagesState, action);

      expect(result).toBe(initialMessagesState);
    });
  });
});
