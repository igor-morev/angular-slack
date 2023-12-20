import { Route } from '@angular/router';

// import { authGuard } from '@angular-slack/auth/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full',
  },
  {
    path: 'client',
    // canLoad: [authGuard],
    loadChildren: () =>
      import('@angular-slack/feature-shell').then((m) => m.SHELL_ROUTES),
  },
];
