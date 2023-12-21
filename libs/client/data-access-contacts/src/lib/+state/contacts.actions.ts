import { createAction, props } from '@ngrx/store';
import { ContactsEntity } from './contacts.models';

export const initContacts = createAction('[Contacts Page] Init');

export const loadContactsSuccess = createAction(
  '[Contacts/API] Load Contacts Success',
  props<{ contacts: ContactsEntity[] }>()
);

export const loadContactsFailure = createAction(
  '[Contacts/API] Load Contacts Failure',
  props<{ error: any }>()
);
