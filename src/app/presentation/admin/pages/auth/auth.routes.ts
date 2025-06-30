import { Routes } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: WEB_ROUTES.AUTH.SIGN_IN,
    pathMatch: 'full',
  },
  {
    path: WEB_ROUTES.AUTH.SIGN_UP,
    loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent),
  },
  {
    path: WEB_ROUTES.AUTH.SIGN_IN,
    loadComponent: () => import('./components/sign-in/sign-in.component').then(m => m.SignInComponent),
  },
  {
    path: WEB_ROUTES.AUTH.REGISTRATION + '/:type',
    loadComponent: () => import('./components/registration/registration.component').then(m => m.RegistrationComponent),
  },
  {
    path: WEB_ROUTES.AUTH.FORGOT_PASSWORD.ROOT, // 'forgot-password'
    loadComponent: () =>
      import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
];
