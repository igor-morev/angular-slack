import { Message, UpdateMessageParams } from '@angular-slack/slack-api';
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
  props<{
    chatId: string;
    content: string;
    attachments: File[];
    parentChatId?: string;
  }>()
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

export const updateMessage = createAction(
  '[Messages/API] Update Message',
  props<{
    id: string;
    chatId: string;
    updateParams: UpdateMessageParams;
  }>()
);

export const updateMessageSuccess = createAction(
  '[Messages/API] Update Message Success',
  props<{ message: MessagesEntity }>()
);

export const updateMessageFailure = createAction(
  '[Messages/API] Update Message Failure',
  props<{ error: string | null }>()
);


export const sendThreadMessage = createAction(
  '[Messages/API] Send Thread Message',
  props<{
    threadId: string | null;
    parentMessage: Message;
    content: string;
    attachments: File[];
  }>()
);

export const sendThreadMessageSuccess = createAction(
  '[Messages/API] Send Thread Message Success',
  props<{ message: MessagesEntity }>()
);

export const sendThreadMessageFailure = createAction(
  '[Messages/API] Send Thread Message Failure',
  props<{ error: string | null }>()
);
