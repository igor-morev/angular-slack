import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ChannelsEntity } from './channels.models';
import {
  ChannelsApiActions,
  resetChannelSelection,
  selectChannelByChatId,
} from './channels.actions';

export const CHANNELS_FEATURE_KEY = 'channels';

export interface ChannelsState extends EntityState<ChannelsEntity> {
  selectedChannel?: ChannelsEntity | null;
  loaded: boolean; // has the Channels list been loaded
  error?: string | null; // last known error (if any)
}

export interface ChannelsPartialState {
  readonly [CHANNELS_FEATURE_KEY]: ChannelsState;
}

export const channelsAdapter: EntityAdapter<ChannelsEntity> =
  createEntityAdapter<ChannelsEntity>();

export const initialChannelsState: ChannelsState =
  channelsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialChannelsState,
  on(ChannelsApiActions.init, (state) => ({
    ...state,
    error: null,
  })),
  on(ChannelsApiActions.loadSuccess, (state, { channels }) =>
    channelsAdapter.setAll(channels, { ...state })
  ),
  on(ChannelsApiActions.createSuccess, (state, { channel }) =>
    channelsAdapter.addOne(channel, { ...state })
  ),
  on(selectChannelByChatId, (state, { chatId }) => ({
    ...state,
    selectedChannel: Object.values(state.entities).find(
      (contact) => contact?.chatId === chatId
    ),
  })),
  on(resetChannelSelection, (state) => ({
    ...state,
    selectedChannel: null,
  }))
);

export function channelsReducer(
  state: ChannelsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
