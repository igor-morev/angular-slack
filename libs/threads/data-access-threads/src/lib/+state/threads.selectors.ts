import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  THREADS_FEATURE_KEY,
  ThreadsState,
  threadsAdapter,
} from './threads.reducer';

// Lookup the 'Threads' feature state managed by NgRx
export const selectThreadsState =
  createFeatureSelector<ThreadsState>(THREADS_FEATURE_KEY);

const { selectAll, selectEntities } = threadsAdapter.getSelectors();

export const selectThreadsLoaded = createSelector(
  selectThreadsState,
  (state: ThreadsState) => state.loaded
);

export const selectThreadsError = createSelector(
  selectThreadsState,
  (state: ThreadsState) => state.error
);

export const selectAllThreads = createSelector(
  selectThreadsState,
  (state: ThreadsState) => selectAll(state)
);

export const selectThreadsEntities = createSelector(
  selectThreadsState,
  (state: ThreadsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectThreadsState,
  (state: ThreadsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectThreadsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
