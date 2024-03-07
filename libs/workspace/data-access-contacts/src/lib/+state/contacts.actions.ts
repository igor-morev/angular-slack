import { createAction, props } from '@ngrx/store';
import { ContactsEntity } from './contacts.models';

export const initContacts = createAction('[Contacts Page] Init');

export const loadContactsSuccess = createAction(
  '[Contacts/API] Load Contacts Success',
  props<{ contacts: ContactsEntity[] }>()
);

export const loadContactsFailure = createAction(
  '[Contacts/API] Load Contacts Failure',
  props<{ error: string | null }>()
);

// export const selectContact = createAction(
//   '[Contacts/API] Select Contact',
//   props<{ contact: ContactsEntity }>()
// );

export const selectContactByChatId = createAction(
  '[Contacts] Select Contact By ChatId',
  props<{ chatId: string }>()
);

export const selectContactSelection = createAction(
  '[Contacts] Reset Contact selection'
);
