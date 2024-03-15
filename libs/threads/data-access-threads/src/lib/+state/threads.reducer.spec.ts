import { Action } from '@ngrx/store';

import * as ThreadsActions from './threads.actions';
import { ThreadsEntity } from './threads.models';
import {
  ThreadsState,
  initialThreadsState,
  threadsReducer,
} from './threads.reducer';

describe('Threads Reducer', () => {
  const createThreadsEntity = (id: string, name = ''): ThreadsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Threads actions', () => {
    it('loadThreadsSuccess should return the list of known Threads', () => {
      const threads = [
        createThreadsEntity('PRODUCT-AAA'),
        createThreadsEntity('PRODUCT-zzz'),
      ];
      const action = ThreadsActions.loadThreadsSuccess({ threads });

      const result: ThreadsState = threadsReducer(initialThreadsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = threadsReducer(initialThreadsState, action);

      expect(result).toBe(initialThreadsState);
    });
  });
});
