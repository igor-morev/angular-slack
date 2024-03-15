import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  MESSAGES_FEATURE_KEY,
  messagesReducer,
  MessagesEffects,
} from '@angular-slack/data-access-messages';
import {
  ChannelsEffects,
  channelsReducer,
  CHANNELS_FEATURE_KEY,
} from '@angular-slack/data-access-channels';
import {
  ThreadsEffects,
  threadsReducer,
  THREADS_FEATURE_KEY,
} from '@angular-slack/data-access-threads';
import { WorkspaceComponent } from './workspace.component';
import {
  ContactsEffects,
  contactsReducer,
  CONTACTS_FEATURE_KEY,
} from '@angular-slack/data-access-contacts';

export const WORKSPACE_ROUTES: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'threads',
        loadComponent: () =>
          import('@angular-slack/threads/feature-threads').then(
            (m) => m.ThreadsComponent
          ),
      },
      {
        path: 'direct/:chatId',
        loadComponent: () =>
          import('@angular-slack/chat/feature-primary-view').then(
            (m) => m.PrimaryViewComponent
          ),
      },
      {
        path: 'channels/:chatId',
        loadComponent: () =>
          import('@angular-slack/chat/feature-channel-chat-view').then(
            (m) => m.ChannelChatViewComponent
          ),
      },
    ],
    providers: [
      provideState(MESSAGES_FEATURE_KEY, messagesReducer),
      provideEffects(MessagesEffects),
      provideState(CONTACTS_FEATURE_KEY, contactsReducer),
      provideEffects(ContactsEffects),
      provideState(CHANNELS_FEATURE_KEY, channelsReducer),
      provideEffects(ChannelsEffects),

      provideState(THREADS_FEATURE_KEY, threadsReducer),
      provideEffects(ThreadsEffects),
    ],
  },
];
