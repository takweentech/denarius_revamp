import { Component, OnInit, inject, signal } from "@angular/core";
import { OpportunityCardComponent } from "../../../../../../shared/components/opportunity-card/opportunity-card.component";
import { WEB_ROUTES } from "../../../../../../core/constants/routes.constants";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { takeUntil } from "rxjs";
import { Opportunity } from "../../../../../../core/models/opportunity";
import { OpportunityService } from "../../../../../../data/opportunity.service";
@Component({
  selector: "app-opportunities",
  imports: [OpportunityCardComponent, TranslateModule, RouterLink],
  templateUrl: "./opportunities.component.html",
  styleUrl: "./opportunities.component.scss",
})
export class OpportunitiesComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly opportunityService = inject(OpportunityService);
  content = this.activatedRoute.snapshot.data["content"]["opportunities"];
  WEB_ROUTES = WEB_ROUTES;
  opportunities = signal<Opportunity[]>([]);

  ngOnInit(): void {
    this.getOpportunities();
  }


  getOpportunities(): void {
    this.opportunityService.getPaged({
      pageNumber: 1,
      pageSize: 6,
      filter: {
      },
      orderByValue: [
        {
        }
      ]
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.opportunities.set(response.data);
      }
    })
  }
}
