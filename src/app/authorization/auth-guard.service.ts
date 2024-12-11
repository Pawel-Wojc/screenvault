import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { filter, map } from 'rxjs';

export const authGuardService: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter((isAutheticated) => isAutheticated !== null),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; // Allow navigation if authenticated
      }
      router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    })
  );
};
