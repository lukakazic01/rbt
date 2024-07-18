import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAuth0} from "@auth0/auth0-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-8w0glb2ko7reuap1.us.auth0.com',
      clientId: '38Gs3AoYOibOYcyltSljWuhOCX7KcSTb',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
};
