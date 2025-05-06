import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { InvestmentOpportunity } from "./opportunity.model";
import { WEB_ROUTES } from "../../../core/constants/routes.constants";
import { Opportunity } from "../../../core/models/opportunity";

@Component({
  selector: "app-opportunity-card",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: "./opportunity-card.component.html",
  styleUrl: "./opportunity-card.component.scss",
})
export class OpportunityCardComponent {
  webRoutes = WEB_ROUTES;
  @Input() opportunity!: any;
}
