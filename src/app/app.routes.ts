import { Routes } from "@angular/router";
import { WEB_ROUTES } from "./core/constants/routes.constants";
import { LandingLayoutComponent } from "./layout/landing-layout/landing-layout.component";
import { ShowcaseComponent } from "./shared/components/showcase/showcase.component";
import { OPPORTUNITIES_ROUTES } from "./presentation/landing/pages/opportunities/opportunities.routes";
import { SERVICES_ROUTES } from "./presentation/landing/pages/services/services.routes";
import { homepageResolver } from "./presentation/landing/pages/homepage/homepage.resolver";
import { servicesResolver } from "./presentation/landing/pages/services/services.resolver";
import { aboutResolver } from "./presentation/landing/pages/about-us/about-us.resolver";
import { AdminLayoutComponent } from "./layout/admin-layout/admin.component";
import { AUTH_ROUTES } from "./presentation/admin/pages/auth/auth.routes";

export const routes: Routes = [
  //Public 
  {
    path: "",
    component: LandingLayoutComponent,
    children: [
      {
        path: WEB_ROUTES.HOME.ROOT,
        resolve: { content: homepageResolver },
        children: [
          {
            path: "",
            loadComponent: () =>
              import(
                "./presentation/landing/pages/homepage/homepage.component"
              ).then((m) => m.HomepageComponent),
          },

          {
            path: WEB_ROUTES.OPPORTUNITIES.ROOT,
            children: [
              {
                path: "",
                loadComponent: () =>
                  import(
                    "./presentation/landing/pages/opportunities/opportunities.component"
                  ).then((m) => m.OpportunitiesComponent),
                children: OPPORTUNITIES_ROUTES,
              },
            ],
          },
          {
            path: WEB_ROUTES.SERVICES.ROOT,
            children: [
              {
                path: "",
                loadComponent: () =>
                  import(
                    "./presentation/landing/pages/services/services.component"
                  ).then((m) => m.ServicesComponent),
                resolve: { content: servicesResolver },
                children: SERVICES_ROUTES,
              },
            ],
          },
          {
            path: WEB_ROUTES.ABOUT_US.ROOT,
            children: [
              {
                path: "",
                loadComponent: () =>
                  import(
                    "./presentation/landing/pages/about-us/about-us.component"
                  ).then((m) => m.AboutUsComponent),
                resolve: { content: aboutResolver },
              },
            ],
          },
        ],
      },
    ]
  },
  {
    path: WEB_ROUTES.AUTH.ROOT,
    children: [
      {
        path: "",
        loadComponent: () =>
          import(
            "./presentation/admin/pages/auth/auth.component"
          ).then((m) => m.AuthComponent),
        children: AUTH_ROUTES,
      },
    ],
  },
  //Admin
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: WEB_ROUTES.DASHBOARD.ROOT,
        loadComponent: () =>
          import(
            "./presentation/admin/pages/dashboard/dashboard.component"
          ).then((m) => m.DashboardComponent),
      },
    ]
  },

  {
    path: "showcase",
    component: ShowcaseComponent,
  },
];
