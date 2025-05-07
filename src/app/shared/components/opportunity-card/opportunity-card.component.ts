import { Component, Input } from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { WEB_ROUTES } from "../../../core/constants/routes.constants";
import { Opportunity } from "../../../core/models/opportunity";
import { TimeDiffPipe } from "../../pipes/time-left.pipe";

@Component({
  selector: "app-opportunity-card",
  standalone: true,
  imports: [RouterModule, TranslateModule, TimeDiffPipe, NgClass],
  templateUrl: "./opportunity-card.component.html",
  styleUrl: "./opportunity-card.component.scss",
})
export class OpportunityCardComponent {
  webRoutes = WEB_ROUTES;
  @Input() opportunity!: Opportunity;
}
