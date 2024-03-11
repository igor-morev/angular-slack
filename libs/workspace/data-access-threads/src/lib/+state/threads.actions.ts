import {
  CreateThreadParams,
  UpdateThreadParams,
} from '@angular-slack/slack-api';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ThreadsEntity } from './threads.models';

export const ThreadsApiActions = createActionGroup({
  source: 'ThreadsApi',
  events: {
    init: emptyProps(),
    loadSuccess: props<{ threads: ThreadsEntity[] }>(),
    loadFailure: props<{ error: string | null }>(),
    create: props<{ payload: CreateThreadParams }>(),
    createSuccess: props<{ thread: ThreadsEntity }>(),
    createFailure: props<{ error: string | null }>(),
    update: props<{ id: string; payload: UpdateThreadParams }>(),
    updateSuccess: props<{ thread: ThreadsEntity }>(),
    updateFailure: props<{ error: string | null }>(),
  },
});
