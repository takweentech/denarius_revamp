import { Routes } from '@angular/router';
import { WEB_ROUTES } from './core/constants/routes.constants';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { ShowcaseComponent } from './shared/components/showcase/showcase.component';
import { OPPORTUNITIES_ROUTES } from './presentation/landing/pages/opportunities/opportunities.routes';
import { SERVICES_ROUTES } from './presentation/landing/pages/services/services.routes';
import { homepageResolver } from './presentation/landing/pages/homepage/homepage.resolver';
import { servicesResolver } from './presentation/landing/pages/services/services.resolver';
import { aboutResolver } from './presentation/landing/pages/about-us/about-us.resolver';
import { AdminLayoutComponent } from './layout/admin-layout/admin.component';
import { AUTH_ROUTES } from './presentation/admin/pages/auth/auth.routes';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { INVESTMENTS_ROUTES } from './presentation/admin/pages/investments/investments.routes';
import { WALLET_ROUTES } from './presentation/admin/pages/wallet/wallet.routes';
import { EARNINGS_ROUTES } from './presentation/admin/pages/earnings/earnings.routes';
import { SETTINGS_ROUTES } from './presentation/admin/pages/settings/settings.routes';
import { termsResolver } from './presentation/landing/pages/terms/terms.resolver';
import { contactResolver } from './presentation/landing/pages/contact/contact.resolver';

export const routes: Routes = [
  //Public
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: WEB_ROUTES.HOME.ROOT,
        resolve: { content: homepageResolver },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./presentation/landing/pages/homepage/homepage.component').then(m => m.HomepageComponent),
          },

          {
            path: WEB_ROUTES.OPPORTUNITIES.ROOT,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./presentation/landing/pages/opportunities/opportunities.component').then(
                    m => m.OpportunitiesComponent
                  ),
                children: OPPORTUNITIES_ROUTES,
              },
            ],
          },
          {
            path: WEB_ROUTES.SERVICES.ROOT,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./presentation/landing/pages/services/services.component').then(m => m.ServicesComponent),
                resolve: { content: servicesResolver },
                children: SERVICES_ROUTES,
              },
            ],
          },
          {
            path: WEB_ROUTES.ABOUT_US.ROOT,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./presentation/landing/pages/about-us/about-us.component').then(m => m.AboutUsComponent),
                resolve: { content: aboutResolver },
              },
            ],
          },
          {
            path: WEB_ROUTES.TERMS.ROOT,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./presentation/landing/pages/terms/terms.component').then(m => m.TermsComponent),
                resolve: { content: termsResolver },
              },
            ],
          },
          {
            path: WEB_ROUTES.CONTACT.ROOT,
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./presentation/landing/pages/contact/contact.component').then(m => m.ContactComponent),
                resolve: { content: contactResolver },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: WEB_ROUTES.AUTH.ROOT,
    canActivate: [noAuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/admin/pages/auth/auth.component').then(m => m.AuthComponent),
        children: AUTH_ROUTES,
      },
    ],
  },
  //Admin
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: WEB_ROUTES.DASHBOARD.ROOT,
        loadComponent: () =>
          import('./presentation/admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: WEB_ROUTES.SETTINGS.ROOT,
        children: SETTINGS_ROUTES,
      },
      {
        path: WEB_ROUTES.TRANSACTIONS.ROOT,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./presentation/admin/pages/transactions/transactions.component').then(
                m => m.TransactionsComponent
              ),
          },
          {
            path: WEB_ROUTES.TRANSACTIONS.DETAILS + '/' + ':id',
            loadComponent: () =>
              import('./presentation/admin/pages/transactions/components/details/details.component').then(
                m => m.DetailsComponent
              ),
          },
        ],
      },
      {
        path: WEB_ROUTES.INVESTMENTS.ROOT,
        loadComponent: () =>
          import('./presentation/admin/pages/investments/investments.component').then(m => m.InvestmentsComponent),
        children: INVESTMENTS_ROUTES,
      },
      {
        path: WEB_ROUTES.WALLET.ROOT,
        loadComponent: () => import('./presentation/admin/pages/wallet/wallet.component').then(m => m.WalletComponent),
        children: WALLET_ROUTES,
      },
      {
        path: WEB_ROUTES.EARNINGS.ROOT,
        loadComponent: () =>
          import('./presentation/admin/pages/earnings/earnings.component').then(m => m.EarningsComponent),
        children: EARNINGS_ROUTES,
      },
    ],
  },

  {
    path: 'showcase',
    component: ShowcaseComponent,
  },
];
