import { Route } from '@angular/router';

export const OPPORTUNITIES_ROUTES: Route[] = [
    // LISTING
    {
        path: '',
        loadComponent: () => import('./components/listing/listing.component').then((m) => m.ListingComponent),
        providers: [],
    },
    // DETAILS
    {
        path: 'details',
        loadComponent: () => import('./components/details/details.component').then((m) => m.DetailsComponent),
        providers: [],
    },
];
