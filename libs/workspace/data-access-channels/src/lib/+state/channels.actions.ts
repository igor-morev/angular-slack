import { createAction, props } from '@ngrx/store';
import { ChannelsEntity } from './channels.models';

export const initChannels = createAction('[Channels Page] Init');

export const loadChannelsSuccess = createAction(
  '[Channels/API] Load Channels Success',
  props<{ channels: ChannelsEntity[] }>()
);

export const loadChannelsFailure = createAction(
  '[Channels/API] Load Channels Failure',
  props<{ error: any }>()
);
