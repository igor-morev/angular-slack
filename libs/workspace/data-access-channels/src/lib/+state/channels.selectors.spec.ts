import { ChannelsEntity } from './channels.models';
import {
  channelsAdapter,
  ChannelsPartialState,
  initialChannelsState,
} from './channels.reducer';
import * as ChannelsSelectors from './channels.selectors';

describe('Channels Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getChannelsId = (it: ChannelsEntity) => it.id;
  const createChannelsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ChannelsEntity);

  let state: ChannelsPartialState;

  beforeEach(() => {
    state = {
      channels: channelsAdapter.setAll(
        [
          createChannelsEntity('PRODUCT-AAA'),
          createChannelsEntity('PRODUCT-BBB'),
          createChannelsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialChannelsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Channels Selectors', () => {
    it('selectAllChannels() should return the list of Channels', () => {
      const results = ChannelsSelectors.selectAllChannels(state);
      const selId = getChannelsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ChannelsSelectors.selectEntity(state) as ChannelsEntity;
      const selId = getChannelsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectChannelsLoaded() should return the current "loaded" status', () => {
      const result = ChannelsSelectors.selectChannelsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectChannelsError() should return the current "error" state', () => {
      const result = ChannelsSelectors.selectChannelsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
