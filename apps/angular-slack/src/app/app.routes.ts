import { Route } from '@angular/router';

// import { authGuard } from '@angular-slack/auth/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'client/1/channels/channel-1',
    pathMatch: 'full',
  },
  {
    path: 'client',
    // canLoad: [authGuard],
    loadChildren: () =>
      import('@angular-slack/feature-shell').then((m) => m.SHELL_ROUTES),
  },
];
