import { Route } from "@angular/router";

export const EARNINGS_ROUTES: Route[] = [
    // LISTING
    {
        path: "",
        loadComponent: () =>
            import("./components/listing/listing.component").then(
                (m) => m.ListingComponent
            ),
        providers: [],
    },
];
