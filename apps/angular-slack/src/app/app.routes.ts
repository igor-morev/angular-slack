import { Route } from '@angular/router';

import { AuthComponent } from '@angular-slack/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'client',
    loadChildren: () =>
      import('@angular-slack/shell').then((m) => m.SHELL_ROUTES),
  },
];
