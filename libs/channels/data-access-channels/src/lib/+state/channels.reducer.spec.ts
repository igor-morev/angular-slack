import { Action } from '@ngrx/store';

import * as ChannelsActions from './channels.actions';
import { ChannelsEntity } from './channels.models';
import {
  ChannelsState,
  initialChannelsState,
  channelsReducer,
} from './channels.reducer';

describe('Channels Reducer', () => {
  const createChannelsEntity = (id: string, name = ''): ChannelsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Channels actions', () => {
    it('loadChannelsSuccess should return the list of known Channels', () => {
      const channels = [
        createChannelsEntity('PRODUCT-AAA'),
        createChannelsEntity('PRODUCT-zzz'),
      ];
      const action = ChannelsActions.loadChannelsSuccess({ channels });

      const result: ChannelsState = channelsReducer(
        initialChannelsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = channelsReducer(initialChannelsState, action);

      expect(result).toBe(initialChannelsState);
    });
  });
});
