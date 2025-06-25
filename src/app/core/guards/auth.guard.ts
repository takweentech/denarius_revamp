import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { WEB_ROUTES } from '../constants/routes.constants';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isAuthenticated()) {
    // User is authenticated, allow access
    return true;
  } else {
    // User is not authenticated, redirect to login
    router.navigate(['/' + WEB_ROUTES.AUTH.ROOT]);
    return false;
  }
};

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.isAuthenticated()) {
    // If user is authenticated
    router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT]);
    return false;
  } else {
    // If not authenticated
    return true;
  }
};
