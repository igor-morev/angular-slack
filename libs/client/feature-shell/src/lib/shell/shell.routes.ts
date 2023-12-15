import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const SHELL_ROUTES: Routes = [
  {
    path: ':clientId',
    component: ShellComponent,
    children: [
      {
        path: ':roomId',
        loadComponent: () =>
          import('@angular-slack/primary-view').then(
            (m) => m.PrimaryViewComponent
          ),
      },
    ],
  },
];
