import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardService: CanActivateFn = () => {
  const router = inject(Router);
  //here you can check if user is logged in or not
  if (false) {
    return true;
  } else {
    return router.createUrlTree(['/not-found'], {
      queryParams: { redirectTo: router.url },
    });
  }
};
