import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { InvestmentPaymentResponse } from "../../../../../../../../core/models/investment";
import { RouterLink } from "@angular/router";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";

@Component({
  selector: "app-success",
  imports: [TranslateModule, RouterLink],
  templateUrl: "./success.component.html",
  styleUrl: "./success.component.scss",
})
export class SuccessComponent {
  WEB_ROUTES = WEB_ROUTES;
  @Input() investmentPaymentResponse!: InvestmentPaymentResponse;
}
