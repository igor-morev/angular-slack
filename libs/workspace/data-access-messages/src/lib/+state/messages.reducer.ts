import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as MessagesActions from './messages.actions';
import { MessagesEntity } from './messages.models';

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
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialMessagesState,
  on(MessagesActions.initMessages, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MessagesActions.loadMessagesSuccess, (state, { messages }) =>
    messagesAdapter.addMany(messages, { ...state, loaded: true })
  ),
  on(MessagesActions.loadMessagesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MessagesActions.sendMessageSuccess, (state, { message }) =>
    messagesAdapter.addOne(message, { ...state })
  ),
  // TODO: move to UI store messages
  on(MessagesActions.scrollToMessage, (state, { index }) => ({
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
