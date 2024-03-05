import { createAction, props } from '@ngrx/store';
import { ThreadsEntity } from './threads.models';

export const initThreads = createAction('[Threads Page] Init');

export const loadThreadsSuccess = createAction(
  '[Threads/API] Load Threads Success',
  props<{ threads: ThreadsEntity[] }>()
);

export const loadThreadsFailure = createAction(
  '[Threads/API] Load Threads Failure',
  props<{ error: any }>()
);
