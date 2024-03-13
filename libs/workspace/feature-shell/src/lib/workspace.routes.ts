import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  MESSAGES_FEATURE_KEY,
  messagesReducer,
  MessagesEffects,
} from '@angular-slack/data-access-messages';
import {
  ContactsEffects,
  contactsReducer,
  CONTACTS_FEATURE_KEY,
} from '@angular-slack/data-access-contacts';
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

export const WORKSPACE_ROUTES: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: 'threads',
        loadComponent: () =>
          import('@angular-slack/workspace/feature-threads').then(
            (m) => m.ThreadsComponent
          ),
      },
      {
        path: 'direct/:chatId',
        loadComponent: () =>
          import('@angular-slack/workspace/feature-primary-view').then(
            (m) => m.PrimaryViewComponent
          ),
      },
      {
        path: 'channels/:chatId',
        loadComponent: () =>
          import('@angular-slack/workspace/feature-channel-chat-view').then(
            (m) => m.ChannelChatViewComponent
          ),
      },
    ],
    providers: [
      provideState(CONTACTS_FEATURE_KEY, contactsReducer),
      provideEffects(ContactsEffects),
      provideState(CHANNELS_FEATURE_KEY, channelsReducer),
      provideEffects(ChannelsEffects),
      provideState(MESSAGES_FEATURE_KEY, messagesReducer),
      provideEffects(MessagesEffects),
      provideState(THREADS_FEATURE_KEY, threadsReducer),
      provideEffects(ThreadsEffects),
    ],
  },
];
