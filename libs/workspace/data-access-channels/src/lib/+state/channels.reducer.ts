import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ChannelsActions from './channels.actions';
import { ChannelsEntity } from './channels.models';

export const CHANNELS_FEATURE_KEY = 'channels';

export interface ChannelsState extends EntityState<ChannelsEntity> {
  selectedId?: string | number; // which Channels record has been selected
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
  on(ChannelsActions.initChannels, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ChannelsActions.loadChannelsSuccess, (state, { channels }) =>
    channelsAdapter.setAll(channels, { ...state, loaded: true })
  ),
  on(ChannelsActions.loadChannelsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function channelsReducer(
  state: ChannelsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
