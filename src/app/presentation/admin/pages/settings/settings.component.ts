import { Component } from "@angular/core";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileComponent } from "./components/profile/profile.component";
import { SecurityComponent } from "./components/security/security.component";
import { BankComponent } from "./components/bank/bank.component";

import { InvestmentComponent } from "./components/investment/investment.component";
@Component({
  selector: "app-settings",
  imports: [
    NgbNavModule,
    ProfileComponent,
    SecurityComponent,
    BankComponent,
    InvestmentComponent,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {
  active: number = 1;
}
