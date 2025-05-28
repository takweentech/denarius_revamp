import { Component, inject, signal } from '@angular/core';
import { UserProfileData } from '../../../../../../core/models/user';
import { TokenService } from '../../../../../../core/services/token.service';
import { EarningsDistributionChartComponent } from "./components/earnings-distribution-chart/earnings-distribution-chart.component";
import { InvestmentsChartComponent } from "./components/investments-chart/investments-chart.component";
import { Investment, InvestmentFilter } from '../../../../../../core/models/investment';
import { InvestorService } from '../../../../../../data/investor.service';
import { finalize, takeUntil } from 'rxjs';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { DatePipe } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listing',
  imports: [EarningsDistributionChartComponent, InvestmentsChartComponent, DatePipe, NgbPaginationModule,
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent extends BaseComponent {
  private readonly tokenService = inject(TokenService);
  private readonly investorService = inject(InvestorService);
  pagination: InvestmentFilter = {
    pageNumber: 1,
    pageSize: 5,
    filter: {
    },
    orderByValue: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
  };
  WEB_ROUTES = WEB_ROUTES;
  investments = signal<Investment[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);
  user: UserProfileData = this.tokenService.getUser();

  loadInvestments(): void {
    this.loading.set(true);
    this.investorService
      .getPaged(this.pagination)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.investments.set(response.data.data);
          this.total.set(response.data.totalCount);
        },
        error: () => { },
      });
  }

  ngOnInit(): void {
    this.loadInvestments();
  }

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadInvestments();
  }

}
