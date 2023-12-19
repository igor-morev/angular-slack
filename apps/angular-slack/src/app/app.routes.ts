import { Route } from '@angular/router';

import { AuthComponent } from '@angular-slack/auth/feature-auth';

import { authGuard } from '@angular-slack/auth/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'client',
    canLoad: [authGuard],
    loadChildren: () =>
      import('@angular-slack/feature-shell').then((m) => m.SHELL_ROUTES),
  },
];
