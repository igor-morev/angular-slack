import { ThreadsEntity } from './threads.models';
import {
  threadsAdapter,
  ThreadsPartialState,
  initialThreadsState,
} from './threads.reducer';
import * as ThreadsSelectors from './threads.selectors';

describe('Threads Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getThreadsId = (it: ThreadsEntity) => it.id;
  const createThreadsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ThreadsEntity);

  let state: ThreadsPartialState;

  beforeEach(() => {
    state = {
      threads: threadsAdapter.setAll(
        [
          createThreadsEntity('PRODUCT-AAA'),
          createThreadsEntity('PRODUCT-BBB'),
          createThreadsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialThreadsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Threads Selectors', () => {
    it('selectAllThreads() should return the list of Threads', () => {
      const results = ThreadsSelectors.selectAllThreads(state);
      const selId = getThreadsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ThreadsSelectors.selectEntity(state) as ThreadsEntity;
      const selId = getThreadsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectThreadsLoaded() should return the current "loaded" status', () => {
      const result = ThreadsSelectors.selectThreadsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectThreadsError() should return the current "error" state', () => {
      const result = ThreadsSelectors.selectThreadsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
