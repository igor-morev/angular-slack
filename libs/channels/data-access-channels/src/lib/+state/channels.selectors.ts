import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHANNELS_FEATURE_KEY,
  ChannelsState,
  channelsAdapter,
} from './channels.reducer';

// Lookup the 'Channels' feature state managed by NgRx
export const selectChannelsState =
  createFeatureSelector<ChannelsState>(CHANNELS_FEATURE_KEY);

const { selectAll, selectEntities } = channelsAdapter.getSelectors();

export const selectChannelsLoaded = createSelector(
  selectChannelsState,
  (state: ChannelsState) => state.loaded
);

export const selectChannelsError = createSelector(
  selectChannelsState,
  (state: ChannelsState) => state.error
);

export const selectAllChannels = createSelector(
  selectChannelsState,
  (state: ChannelsState) => selectAll(state)
);

export const selectChannelsEntities = createSelector(
  selectChannelsState,
  (state: ChannelsState) => selectEntities(state)
);

// export const selectSelectedId = createSelector(
//   selectChannelsState,
//   (state: ChannelsState) => state.selectedId
// );

export const selectSelectedChannelsEntity = createSelector(
  selectChannelsState,
  (state: ChannelsState) => state.selectedChannel
);
