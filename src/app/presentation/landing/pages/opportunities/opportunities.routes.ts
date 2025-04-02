import { Route } from "@angular/router";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";

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
    path: WEB_ROUTES.OPPORTUNITIES.DETAILS,
    loadComponent: () =>
      import("./components/details/details.component").then(
        (m) => m.DetailsComponent
      ),
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
      },
      {
        path: WEB_ROUTES.OPPORTUNITIES.SUCCESS,
        loadComponent: () =>
          import(
            "./components/details/components/success/success.component"
          ).then((m) => m.SuccessComponent),
      },
    ],
    providers: [],
  },
];
