import { Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";

export const SETTINGS_ROUTES: Routes = [
    {
        path: "",
        component: SettingsComponent,
        children: [
            { path: "", redirectTo: WEB_ROUTES.SETTINGS.PROFILE, pathMatch: "full" },
            { path: WEB_ROUTES.SETTINGS.PROFILE, loadComponent: () => import("./components/profile/profile.component").then(c => c.ProfileComponent) },
            { path: WEB_ROUTES.SETTINGS.PERSONAL, loadComponent: () => import("./components/personal/personal.component").then(c => c.PersonalComponent) },
            { path: WEB_ROUTES.SETTINGS.SECURITY, loadComponent: () => import("./components/security/security.component").then(c => c.SecurityComponent) },
            { path: WEB_ROUTES.SETTINGS.BANK, loadComponent: () => import("./components/bank/bank.component").then(c => c.BankComponent) },
            { path: WEB_ROUTES.SETTINGS.INVESTMENT, loadComponent: () => import("./components/investment/investment.component").then(c => c.InvestmentComponent) },
            { path: WEB_ROUTES.SETTINGS.UPGRADE, loadComponent: () => import("./components/upgrade/upgrade.component").then(c => c.UpgradeComponent) },
        ],
    },
];