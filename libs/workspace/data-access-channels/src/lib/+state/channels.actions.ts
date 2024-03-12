import { ChannelCreate } from '@angular-slack/slack-api';
import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ChannelsEntity } from './channels.models';

export const ChannelsApiActions = createActionGroup({
  source: 'ChannelsApi',
  events: {
    init: emptyProps(),
    loadSuccess: props<{ channels: ChannelsEntity[] }>(),
    loadFailure: props<{ error: string | null }>(),
    create: props<ChannelCreate>(),
    createSuccess: props<{ channel: ChannelsEntity }>(),
    createFailure: props<{ error: string | null }>(),
  },
});

export const selectChannelByChatId = createAction(
  '[Channels] Select Channel By ChatId',
  props<{ chatId: string }>()
);

export const resetChannelSelection = createAction(
  '[Channels] Reset Channel Selection'
);
