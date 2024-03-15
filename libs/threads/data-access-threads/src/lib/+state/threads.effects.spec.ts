import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ThreadsActions from './threads.actions';
import { ThreadsEffects } from './threads.effects';

describe('ThreadsEffects', () => {
  let actions: Observable<Action>;
  let effects: ThreadsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ThreadsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ThreadsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ThreadsActions.initThreads() });

      const expected = hot('-a-|', {
        a: ThreadsActions.loadThreadsSuccess({ threads: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
