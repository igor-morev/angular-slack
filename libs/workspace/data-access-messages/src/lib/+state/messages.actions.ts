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
  props<{ error: string | null }>()
);

export const sendMessage = createAction(
  '[Messages/API] Send Message',
  props<{ chatId: string; content: string; attachments: File[] }>()
);

export const sendMessageSuccess = createAction(
  '[Messages/API] Send Message Success',
  props<{ message: MessagesEntity }>()
);

export const sendMessageFailure = createAction(
  '[Messages/API] Send Message Failure',
  props<{ error: string | null }>()
);

export const scrollToMessage = createAction(
  '[Messages/UI] ScrollToMessage',
  props<{ index: number }>()
);
