import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ChannelsActions from './channels.actions';
import { ChannelsEffects } from './channels.effects';

describe('ChannelsEffects', () => {
  let actions: Observable<Action>;
  let effects: ChannelsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ChannelsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ChannelsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ChannelsActions.initChannels() });

      const expected = hot('-a-|', {
        a: ChannelsActions.loadChannelsSuccess({ channels: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
