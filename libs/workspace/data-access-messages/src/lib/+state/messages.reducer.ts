import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { MessagesEntity } from './messages.models';
import { MessagesApiActions, scrollToMessage } from '@angular-slack/data-access-messages';

export const MESSAGES_FEATURE_KEY = 'messages';

export interface MessagesState extends EntityState<MessagesEntity> {
  selectedId?: string | number; // which Messages record has been selected
  loaded: boolean; // has the Messages list been loaded
  error?: string | null; // last known error (if any)
  scrollToMessageIndex?: number;
}

export interface MessagesPartialState {
  readonly [MESSAGES_FEATURE_KEY]: MessagesState;
}

export const messagesAdapter: EntityAdapter<MessagesEntity> =
  createEntityAdapter<MessagesEntity>();

export const initialMessagesState: MessagesState =
  messagesAdapter.getInitialState({
    loaded: false,
  });

const reducer = createReducer(
  initialMessagesState,
  on(MessagesApiActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MessagesApiActions.loadSuccess, (state, { messages }) =>
    messagesAdapter.addMany(messages, { ...state, loaded: true })
  ),
  on(MessagesApiActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MessagesApiActions.sendSuccess, (state, { message }) =>
    messagesAdapter.addOne(message, { ...state })
  ),
  on(MessagesApiActions.updateSuccess, (state, { message }) =>
    messagesAdapter.updateOne(
      { id: message.id, changes: message },
      { ...state }
    )
  ),
  on(scrollToMessage, (state, { index }) => ({
    ...state,
    scrollToMessageIndex: index,
  }))
);

export function messagesReducer(
  state: MessagesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
