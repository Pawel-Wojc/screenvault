import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuardService: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //here you can check if user is logged in or not
  if (authService.isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['/not-found'], {
      queryParams: { redirectTo: router.url },
    });
  }
};
