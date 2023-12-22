import { createAction, props, createActionGroup } from '@ngrx/store';
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

export const loadContactByChatActions = createActionGroup({
  source: '[Contacts/API]',
  events: {
    'Load Contact by chat': props<{ chatId: string }>(),
    'Load Contact by chat Success': props<{
      contact: ContactsEntity | undefined;
    }>(),
    'Load Contact by chat Failure': props<{ error: any }>(),
  },
});
