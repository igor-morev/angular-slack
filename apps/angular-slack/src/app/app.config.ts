import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore(),
    provideAnimations(),
    provideRouter(appRoutes),
    importProvidersFrom(TuiRootModule),
    provideRouterStore(),
    !environment.production ? provideStoreDevtools() : [],
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'strike'], // toggled buttons

          [{ list: 'ordered' }, { list: 'bullet' }],

          ['blockquote', 'code', 'code-block'],
        ],
      },
    }),
  ],
};
