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
import { authGuard } from "./core/guards/auth.guard";

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
    ],
  },
  {
    path: WEB_ROUTES.AUTH.ROOT,
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./presentation/admin/pages/auth/auth.component").then(
            (m) => m.AuthComponent
          ),
        children: AUTH_ROUTES,
      },
    ],
  },
  //Admin
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: WEB_ROUTES.DASHBOARD.ROOT,
        loadComponent: () =>
          import(
            "./presentation/admin/pages/dashboard/dashboard.component"
          ).then((m) => m.DashboardComponent),
      },
      {
        path: WEB_ROUTES.SETTINGS.ROOT,
        loadComponent: () =>
          import(
            "./presentation/admin/pages/settings/settings.component"
          ).then((m) => m.SettingsComponent),
      },
      {
        path: WEB_ROUTES.TRANSACTIONS.ROOT,
        children: [
          {
            path: "",
            loadComponent: () =>
              import(
                "./presentation/admin/pages/transactions/transactions.component"
              ).then((m) => m.TransactionsComponent),
          },
          {
            path: WEB_ROUTES.TRANSACTIONS.DETAILS + "/" + ":id",
            loadComponent: () =>
              import(
                "./presentation/admin/pages/transactions/components/details/details.component"
              ).then((m) => m.DetailsComponent),
          },
        ],
      },
    ],
  },

  {
    path: "showcase",
    component: ShowcaseComponent,
  },
];
