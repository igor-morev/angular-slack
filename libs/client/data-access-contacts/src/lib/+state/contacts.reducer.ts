import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ContactsActions from './contacts.actions';
import { ContactsEntity } from './contacts.models';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<ContactsEntity> {
  selectedContact?: ContactsEntity; // which Contacts record has been selected
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
  on(ContactsActions.initContacts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContactsActions.loadContactsSuccess, (state, { contacts }) =>
    contactsAdapter.setAll(contacts, { ...state, loaded: true })
  ),
  on(ContactsActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ContactsActions.loadContactByChatActions.loadContactByChatSuccess,
    (state, { contact }) => ({
      ...state,
      selectedContact: contact,
    })
  )
);

export function contactsReducer(
  state: ContactsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
