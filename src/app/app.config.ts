import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CredentialsInterceptor } from './credentials.interceptor';
import { RefreshTokenInterceptor } from './refresh.token.inteceptor';
import { CSRFInterceptor } from './CSRF-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([RefreshTokenInterceptor, CredentialsInterceptor, ]) //CSRFInterceptor
    ),
    provideAnimationsAsync(),
  ],
};
