import { Routes } from '@angular/router';
import { WEB_ROUTES } from './core/constants/routes.constants';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { ShowcaseComponent } from './shared/components/showcase/showcase.component';

export const routes: Routes = [
    {
        path: WEB_ROUTES.HOME.ROOT,
        component: LandingLayoutComponent,
        children: [
            {
                path: "",
                loadComponent: () => import('./presentation/landing/pages/homepage/homepage.component').then((m) => m.HomepageComponent),
            }
        ]
    },
    {
        path: "showcase",
        component: ShowcaseComponent
    }
];
