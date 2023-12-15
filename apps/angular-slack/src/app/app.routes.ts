import { Route } from '@angular/router';

import { AuthComponent } from '@angular-slack/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'client/:clientId',
    loadComponent: () =>
      import('@angular-slack/shell').then((m) => m.ShellComponent),
  },
];
