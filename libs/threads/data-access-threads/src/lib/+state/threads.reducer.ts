import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ThreadsEntity } from './threads.models';
import { ThreadsApiActions } from './threads.actions';

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
  on(ThreadsApiActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ThreadsApiActions.loadSuccess, (state, { threads }) =>
    threadsAdapter.setAll(threads, { ...state, loaded: true })
  ),
  on(ThreadsApiActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ThreadsApiActions.createSuccess, (state, { thread }) =>
    threadsAdapter.addOne(thread, { ...state })
  ),
  on(ThreadsApiActions.update, (state, { id, payload }) =>
    threadsAdapter.updateOne(
      {
        id,
        changes: payload,
      },
      { ...state }
    )
  )
);

export function threadsReducer(
  state: ThreadsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
