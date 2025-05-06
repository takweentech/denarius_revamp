import { Component, inject, OnInit, signal } from "@angular/core";
import { OpportunityCardComponent } from "../../../../../../shared/components/opportunity-card/opportunity-card.component";
import { TranslateModule } from "@ngx-translate/core";
import { Opportunity } from "../../../../../../core/models/opportunity";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { takeUntil } from "rxjs";
import { OpportunityService } from "../../../../../../data/opportunity.service";

@Component({
  selector: "app-listing",
  imports: [OpportunityCardComponent, TranslateModule],
  templateUrl: "./listing.component.html",
  styleUrl: "./listing.component.scss",
})
export class ListingComponent extends BaseComponent implements OnInit {
  private readonly opportunityService = inject(OpportunityService);
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
