import { Component, OnInit, inject, signal } from '@angular/core';
import { OpportunityCardComponent } from '../../../../../../shared/components/opportunity-card/opportunity-card.component';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { Opportunity, OpportunityFilter } from '../../../../../../core/models/opportunity';
import { OpportunityService } from '../../../../../../data/opportunity.service';
import { StrapiService } from '../../../../../../core/strapi/strapi.service';
@Component({
  selector: 'app-opportunities',
  imports: [OpportunityCardComponent, TranslateModule, RouterLink],
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.scss',
})
export class OpportunitiesComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly opportunityService = inject(OpportunityService);
  private readonly translateService = inject(TranslateService);
  private readonly strapiService = inject(StrapiService);
  content = this.activatedRoute.snapshot.data['content']['opportunities'];

  WEB_ROUTES = WEB_ROUTES;
  opportunities = signal<Opportunity[]>([]);
  filter: OpportunityFilter = {
    pageNumber: 1,
    pageSize: 6,
    filter: {
      name: null,
      statusId: 0,
      nameEn: null,
      nameAr: null,
      isDeleted: true,
    },
    orderByValue: [
      {
        colId: 'id',
        sort: 'desc',
      },
    ],
  };


  ngOnInit(): void {
    this.getOpportunities();
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.getContent();
    })
  }

  getOpportunities(): void {
    this.opportunityService
      .getPaged(this.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.opportunities.set(response.data.data);
        },
      });
  }


  getContent(): void {
    this.strapiService.getContentByPage(`/homepage?locale=${this.translateService.currentLang}&populate=opportunities`).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.content = response.opportunities
      }
    })
  }
}
