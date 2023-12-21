import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTACTS_FEATURE_KEY,
  ContactsState,
  contactsAdapter,
} from './contacts.reducer';

// Lookup the 'Contacts' feature state managed by NgRx
export const selectContactsState =
  createFeatureSelector<ContactsState>(CONTACTS_FEATURE_KEY);

const { selectAll, selectEntities } = contactsAdapter.getSelectors();

export const selectContactsLoaded = createSelector(
  selectContactsState,
  (state: ContactsState) => state.loaded
);

export const selectContactsError = createSelector(
  selectContactsState,
  (state: ContactsState) => state.error
);

export const selectAllContacts = createSelector(
  selectContactsState,
  (state: ContactsState) => selectAll(state)
);

export const selectContactsEntities = createSelector(
  selectContactsState,
  (state: ContactsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectContactsState,
  (state: ContactsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectContactsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
