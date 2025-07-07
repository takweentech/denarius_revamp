import { Route } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { serviceSingleResolver } from './services.resolver';

export const SERVICES_ROUTES: Route[] = [
  // LISTING
  {
    path: '',
    loadComponent: () => import('./components/listing/listing.component').then(m => m.ListingComponent),
    providers: [],
  },
  // DETAILS
  {
    path: WEB_ROUTES.OPPORTUNITIES.DETAILS + '/:id',
    loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent),
    resolve: { service: serviceSingleResolver },
    providers: [],
  },
];
