import { createAction, props } from '@ngrx/store';
import { MessagesEntity } from './messages.models';

export const initMessages = createAction(
  '[Messages Page] Init',
  props<{ chatId: string }>()
);

export const loadMessagesSuccess = createAction(
  '[Messages/API] Load Messages Success',
  props<{ messages: MessagesEntity[] }>()
);

export const loadMessagesFailure = createAction(
  '[Messages/API] Load Messages Failure',
  props<{ error: any }>()
);
