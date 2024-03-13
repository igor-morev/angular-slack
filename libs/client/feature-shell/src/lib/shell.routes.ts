import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  ClientsEffects,
  clientsReducer,
  CLIENTS_FEATURE_KEY,
} from '@angular-slack/client/data-access';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    providers: [
      provideState(CLIENTS_FEATURE_KEY, clientsReducer),
      provideEffects(ClientsEffects),
    ],
    children: [
      {
        path: ':clientId',
        loadChildren: () =>
          import('@angular-slack/workspace/feature-shell').then(
            (m) => m.WORKSPACE_ROUTES
          ),
      },
    ],
  },
];
