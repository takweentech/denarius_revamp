import { Route } from "@angular/router";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
import { opportunityInvestResolver, opportunityResolver } from "./opportunities.resolver";
import { authGuard } from "../../../../core/guards/auth.guard";

export const OPPORTUNITIES_ROUTES: Route[] = [
  // LISTING
  {
    path: "",
    loadComponent: () =>
      import("./components/listing/listing.component").then(
        (m) => m.ListingComponent
      ),
    providers: [],
  },
  // DETAILS
  {
    path: WEB_ROUTES.OPPORTUNITIES.DETAILS + '/:id',
    loadComponent: () =>
      import("./components/details/details.component").then(
        (m) => m.DetailsComponent
      ),
    resolve: { opportunity: opportunityResolver },
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./components/details/components/main/main.component").then(
            (m) => m.MainComponent
          ),
      },
      {
        path: WEB_ROUTES.OPPORTUNITIES.PAYMENT,
        loadComponent: () =>
          import(
            "./components/details/components/payment/payment.component"
          ).then((m) => m.PaymentComponent),
        canActivate: [authGuard],
        resolve: { investment: opportunityInvestResolver },

      },
    ],
    providers: [],
  },
];
