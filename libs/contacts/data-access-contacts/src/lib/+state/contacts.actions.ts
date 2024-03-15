import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { ContactsEntity } from './contacts.models';

export const ContactsApiActions = createActionGroup({
  source: 'ContactsApi',
  events: {
    init: emptyProps(),
    loadSuccess: props<{ contacts: ContactsEntity[] }>(),
    loadFailure: props<{ error: string | null }>(),
  },
});

export const selectContactByChatId = createAction(
  '[Contacts] Select Contact By ChatId',
  props<{ chatId: string }>()
);

export const resetContactSelection = createAction(
  '[Contacts] Reset Contact selection'
);
