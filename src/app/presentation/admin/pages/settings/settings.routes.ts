import { Routes } from "@angular/router";
import { PersonalComponent } from "./components/personal/personal.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SecurityComponent } from "./components/security/security.component";
import { BankComponent } from "./components/bank/bank.component";
import { UpgradeComponent } from "./components/upgrade/upgrade.component";
import { InvestmentComponent } from "./components/investment/investment.component";
import { SettingsComponent } from "./settings.component";

export const SETTINGS_ROUTES: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      { path: "profile", component: ProfileComponent },
      { path: "personal", component: PersonalComponent },
      { path: "security", component: SecurityComponent },
      { path: "bank", component: BankComponent },
      { path: "investment", component: InvestmentComponent },
      { path: "upgrade", component: UpgradeComponent },
    ],
  },
];
