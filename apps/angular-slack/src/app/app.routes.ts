import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'client/1/channels/channel-1',
    pathMatch: 'full',
  },
  {
    path: 'client',
    loadChildren: () =>
      import('@angular-slack/feature-shell').then((m) => m.SHELL_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
