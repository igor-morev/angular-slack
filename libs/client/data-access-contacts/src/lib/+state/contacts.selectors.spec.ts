import { ContactsEntity } from './contacts.models';
import {
  contactsAdapter,
  ContactsPartialState,
  initialContactsState,
} from './contacts.reducer';
import * as ContactsSelectors from './contacts.selectors';

describe('Contacts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContactsId = (it: ContactsEntity) => it.id;
  const createContactsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContactsEntity);

  let state: ContactsPartialState;

  beforeEach(() => {
    state = {
      contacts: contactsAdapter.setAll(
        [
          createContactsEntity('PRODUCT-AAA'),
          createContactsEntity('PRODUCT-BBB'),
          createContactsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialContactsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Contacts Selectors', () => {
    it('selectAllContacts() should return the list of Contacts', () => {
      const results = ContactsSelectors.selectAllContacts(state);
      const selId = getContactsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ContactsSelectors.selectEntity(state) as ContactsEntity;
      const selId = getContactsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectContactsLoaded() should return the current "loaded" status', () => {
      const result = ContactsSelectors.selectContactsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectContactsError() should return the current "error" state', () => {
      const result = ContactsSelectors.selectContactsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
