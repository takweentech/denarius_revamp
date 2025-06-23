import { Component, inject, signal } from "@angular/core";
import {
  UserInvestmentStatisticsData,
  UserProfileData,
} from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import {
  Investment,
  InvestmentFilter,
} from "../../../../../../core/models/investment";
import { InvestorService } from "../../../../../../data/investor.service";
import { finalize, takeUntil } from "rxjs";
import { WEB_ROUTES } from "../../../../../../core/constants/routes.constants";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { DatePipe, DecimalPipe } from "@angular/common";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { ProfileService } from "../../../../../../data/profile.service";

@Component({
  selector: "app-listing",
  imports: [
    DatePipe,
    DecimalPipe,
    NgbPaginationModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: "./listing.component.html",
  styleUrl: "./listing.component.scss",
})
export class ListingComponent extends BaseComponent {
  private readonly tokenService = inject(TokenService);
  private readonly investorService = inject(InvestorService);
  private readonly profileService = inject(ProfileService);

  pagination: InvestmentFilter = {
    pageNumber: 1,
    pageSize: 5,
    filter: {},
    orderByValue: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
  };
  WEB_ROUTES = WEB_ROUTES;
  investments = signal<Investment[]>([]);
  statistics = signal<UserInvestmentStatisticsData | null>(null);
  loading = signal<boolean>(false);
  total = signal<number>(0);
  user: UserProfileData = this.tokenService.getUser();

  loadStatistics(): void {
    this.profileService
      .getInvestmentStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.statistics.set(response.data);
        },
        error: () => {},
      });
  }

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
        error: () => {},
      });
  }

  ngOnInit(): void {
    this.loadStatistics();
    this.loadInvestments();
  }

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadInvestments();
  }
}
