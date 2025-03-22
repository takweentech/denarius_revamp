import { Component } from "@angular/core";
import { InvestmentOpportunitiesComponent } from "../../../../../../shared/components/investment-opportunities/investment-opportunities.component";

@Component({
  selector: "app-opportunities",
  imports: [InvestmentOpportunitiesComponent],
  templateUrl: "./opportunities.component.html",
  styleUrl: "./opportunities.component.scss",
})
export class OpportunitiesComponent {}
