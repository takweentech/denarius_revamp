import { Component, inject, OnInit, signal } from "@angular/core";
import { OpportunityCardComponent } from "../../../../../../shared/components/opportunity-card/opportunity-card.component";
import { TranslateModule } from "@ngx-translate/core";
import { Opportunity, OpportunityFilter } from "../../../../../../core/models/opportunity";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { finalize, takeUntil } from "rxjs";
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
  loading = signal<boolean>(false);
  total = signal<number>(0);
  filter: OpportunityFilter = {
    pageNumber: 1,
    pageSize: 6,
    filter: {
      name: null,
      statusId: 0,
      nameEn: null,
      nameAr: null,
      isDeleted: true
    },
    orderByValue: [
      {
        colId: "id",
        sort: "desc"
      }
    ]
  };
  ngOnInit(): void {
    this.getOpportunities();
  }

  getOpportunities(): void {
    this.loading.set(true);
    this.opportunityService.getPaged(this.filter).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response) => {
        this.opportunities.length ? this.opportunities.set(response.data.data) : this.opportunities.set([...this.opportunities(), ...response.data.data]);
        this.total.set(response.data.totalCount);
      }
    })
  }

  onLoadMore(): void {
    this.filter.pageNumber = this.filter.pageNumber + 1;
    this.getOpportunities();
  }
}
