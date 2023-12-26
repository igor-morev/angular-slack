import { Action } from '@ngrx/store';

import * as ContactsActions from './contacts.actions';
import { ContactsEntity } from './contacts.models';
import {
  ContactsState,
  initialContactsState,
  contactsReducer,
} from './contacts.reducer';

describe('Contacts Reducer', () => {
  const createContactsEntity = (id: string, name = ''): ContactsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Contacts actions', () => {
    it('loadContactsSuccess should return the list of known Contacts', () => {
      const contacts = [
        createContactsEntity('PRODUCT-AAA'),
        createContactsEntity('PRODUCT-zzz'),
      ];
      const action = ContactsActions.loadContactsSuccess({ contacts });

      const result: ContactsState = contactsReducer(
        initialContactsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = contactsReducer(initialContactsState, action);

      expect(result).toBe(initialContactsState);
    });
  });
});
