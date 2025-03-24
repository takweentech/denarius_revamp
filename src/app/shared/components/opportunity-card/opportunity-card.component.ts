import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { InvestmentOpportunity } from "./opportunity.model";

@Component({
  selector: "app-opportunity-card",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: "./opportunity-card.component.html",
  styleUrl: "./opportunity-card.component.scss",
})
export class OpportunityCardComponent {
  @Input() opportunity!: InvestmentOpportunity;
}
