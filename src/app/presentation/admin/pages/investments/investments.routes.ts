import { Route } from "@angular/router";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
import { InvestmentResolver } from "./resolvers/investment.resolver";

export const INVESTMENTS_ROUTES: Route[] = [
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
        resolve: { investment: InvestmentResolver },
        providers: [],
    },
];
