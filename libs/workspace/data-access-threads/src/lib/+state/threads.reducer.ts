import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ThreadsActions from './threads.actions';
import { ThreadsEntity } from './threads.models';

export const THREADS_FEATURE_KEY = 'threads';

export interface ThreadsState extends EntityState<ThreadsEntity> {
  selectedId?: string | number; // which Threads record has been selected
  loaded: boolean; // has the Threads list been loaded
  error?: string | null; // last known error (if any)
}

export interface ThreadsPartialState {
  readonly [THREADS_FEATURE_KEY]: ThreadsState;
}

export const threadsAdapter: EntityAdapter<ThreadsEntity> =
  createEntityAdapter<ThreadsEntity>();

export const initialThreadsState: ThreadsState = threadsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const reducer = createReducer(
  initialThreadsState,
  on(ThreadsActions.initThreads, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ThreadsActions.loadThreadsSuccess, (state, { threads }) =>
    threadsAdapter.setAll(threads, { ...state, loaded: true })
  ),
  on(ThreadsActions.loadThreadsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ThreadsActions.createThreadSuccess, (state, { thread }) =>
    threadsAdapter.addOne(thread, { ...state })
  )
);

export function threadsReducer(
  state: ThreadsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
