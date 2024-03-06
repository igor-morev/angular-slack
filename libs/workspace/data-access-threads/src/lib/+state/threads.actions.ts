import {
  CreateThreadParams,
  UpdateThreadParams,
} from '@angular-slack/slack-api';
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

export const createThread = createAction(
  '[Threads/API] Create Thread',
  props<{ payload: CreateThreadParams }>()
);

export const createThreadSuccess = createAction(
  '[Threads/API] Create Thread Success',
  props<{ thread: ThreadsEntity }>()
);

export const createThreadFailure = createAction(
  '[Threads/API] Create Thread Failure',
  props<{ error: any }>()
);

export const updateThread = createAction(
  '[Threads/API] Update Thread',
  props<{ id: string; payload: UpdateThreadParams }>()
);

export const updateThreadSuccess = createAction(
  '[Threads/API] Update Thread Success',
  props<{ thread: ThreadsEntity }>()
);

export const updateThreadFailure = createAction(
  '[Threads/API] Update Thread Failure',
  props<{ error: any }>()
);
