import { Message } from '@angular-slack/slack-api';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MESSAGES_FEATURE_KEY,
  MessagesState,
  messagesAdapter,
} from './messages.reducer';

import { DateTime } from 'luxon';

// TODO: move to utils ?
function groupMessages(a: Message[], b: Message) {
  const prevMessage = a[a.length - 1];

  if (prevMessage) {
    const previousDate = DateTime.fromISO(prevMessage.createdAt);

    const currentDate = DateTime.fromISO(b.createdAt);
    const diff = Math.abs(
      previousDate.diff(currentDate, ['minutes']).toObject().minutes!
    );

    return a.concat({
      ...b,
      mode:
        prevMessage.author.username === b.author.username && diff <= 1
          ? 'compact'
          : 'full',
    });
  }

  return a.concat({
    ...b,
    mode: 'full',
  });
}

// Lookup the 'Messages' feature state managed by NgRx
export const selectMessagesState =
  createFeatureSelector<MessagesState>(MESSAGES_FEATURE_KEY);

const { selectAll, selectEntities } = messagesAdapter.getSelectors();

export const selectMessagesLoaded = createSelector(
  selectMessagesState,
  (state: MessagesState) => state.loaded
);

export const selectMessagesError = createSelector(
  selectMessagesState,
  (state: MessagesState) => state.error
);

export const selectAllMessages = createSelector(
  selectMessagesState,
  (state: MessagesState) =>
    selectAll(state).reduce(groupMessages, [] as Message[])
);

export const selectMessagesByChatId = (chatId: string) =>
  createSelector(selectAllMessages, (state) =>
    state.filter((message) => message.chatId === chatId)
  );

export const selectMessagesEntities = createSelector(
  selectMessagesState,
  (state: MessagesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectMessagesState,
  (state: MessagesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectMessagesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectScrollToMessageIndex = createSelector(
  selectMessagesState,
  (state) => state.scrollToMessageIndex
);
