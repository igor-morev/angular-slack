import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ContactsActions from './contacts.actions';
import { ContactsEffects } from './contacts.effects';

describe('ContactsEffects', () => {
  let actions: Observable<Action>;
  let effects: ContactsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ContactsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ContactsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ContactsActions.initContacts() });

      const expected = hot('-a-|', {
        a: ContactsActions.loadContactsSuccess({ contacts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
