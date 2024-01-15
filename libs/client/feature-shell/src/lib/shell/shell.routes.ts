import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  ClientsEffects,
  clientsReducer,
  CLIENTS_FEATURE_KEY,
} from '@angular-slack/client/data-access';
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

export const SHELL_ROUTES: Routes = [
  {
    path: ':clientId',
    component: ShellComponent,
    children: [
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
      provideState(CLIENTS_FEATURE_KEY, clientsReducer),
      provideEffects(ClientsEffects),
      provideState(CONTACTS_FEATURE_KEY, contactsReducer),
      provideEffects(ContactsEffects),
      provideState(CHANNELS_FEATURE_KEY, channelsReducer),
      provideEffects(ChannelsEffects),
      provideState(MESSAGES_FEATURE_KEY, messagesReducer),
      provideEffects(MessagesEffects),
    ],
  },
];
