import { UpdateMessageParams } from '@angular-slack/slack-api';
import { createAction, createActionGroup, props } from '@ngrx/store';
import { MessagesEntity } from './messages.models';
import { User } from '@angular-slack/auth/data-access';

export const MessagesApiActions = createActionGroup({
  source: 'MessagesApi',
  events: {
    init: props<{ chatId: string }>(),
    loadSuccess: props<{ messages: MessagesEntity[] }>(),
    loadFailure: props<{ error: string | null }>(),
    send: props<{
      chatId: string;
      content: string;
      attachments: File[];
      parentChatId?: string;
    }>(),
    sendSuccess: props<{
      message: MessagesEntity;
      messagesCount: number;
      authors: User[];
    }>(),
    sendFailure: props<{ error: string | null }>(),
    update: props<{
      id: string;
      chatId: string;
      updateParams: UpdateMessageParams;
    }>(),
    updateSuccess: props<{ message: MessagesEntity }>(),
    updateFailure: props<{ error: string | null }>(),
  },
});

export const scrollToMessage = createAction(
  '[Messages/UI] ScrollToMessage',
  props<{ index: number }>()
);
