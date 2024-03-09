import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ContactsEntity } from './contacts.models';
import { ContactsApiActions, selectContactByChatId } from './contacts.actions';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<ContactsEntity> {
  selectedContact?: ContactsEntity; // which Contacts record has been selected
  selectedChatId?: string;
  loaded: boolean; // has the Contacts list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContactsPartialState {
  readonly [CONTACTS_FEATURE_KEY]: ContactsState;
}

export const contactsAdapter: EntityAdapter<ContactsEntity> =
  createEntityAdapter<ContactsEntity>();

export const initialContactsState: ContactsState =
  contactsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialContactsState,
  on(ContactsApiActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContactsApiActions.loadSuccess, (state, { contacts }) =>
    contactsAdapter.setAll(contacts, { ...state, loaded: true })
  ),
  on(selectContactByChatId, (state, { chatId }) => ({
    ...state,
    selectedContact: Object.values(state.entities).find(
      (contact) => contact?.chatId === chatId
    ),
  }))
);

export function contactsReducer(
  state: ContactsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
