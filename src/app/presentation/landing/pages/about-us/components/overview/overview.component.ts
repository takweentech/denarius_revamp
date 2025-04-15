import { Component } from "@angular/core";
import { CurrencyAmountComponent } from "../../../../../../shared/components/currency-amount/currency-amount.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-overview",
  imports: [CurrencyAmountComponent, TranslateModule],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent {}
