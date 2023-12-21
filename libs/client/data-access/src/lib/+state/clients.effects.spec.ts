import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ClientsActions from './clients.actions';
import { ClientsEffects } from './clients.effects';

describe('ClientsEffects', () => {
  let actions: Observable<Action>;
  let effects: ClientsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ClientsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ClientsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ClientsActions.initClients() });

      const expected = hot('-a-|', {
        a: ClientsActions.loadClientsSuccess({ clients: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
