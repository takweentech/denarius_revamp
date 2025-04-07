import { Component } from "@angular/core";
import { CurrencyAmountComponent } from "../../../../../../shared/components/currency-amount/currency-amount.component";

@Component({
  selector: "app-overview",
  imports: [CurrencyAmountComponent],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent {}
