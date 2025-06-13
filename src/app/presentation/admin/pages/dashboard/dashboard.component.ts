import { Component, inject, OnInit, signal } from '@angular/core';
import { UserProfileData } from '../../../../core/models/user';
import { TokenService } from '../../../../core/services/token.service';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { TransactionChartComponent } from "./components/transaction-chart/transaction-chart.component";
import { PerformanceChartComponent } from "./components/performance-chart/performance-chart.component";
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { Transaction, TransactionFilter } from '../../../../core/models/transaction';
import { TransactionService } from '../../../../data/transaction.service';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';


@Component({
  selector: 'app-dashboard',
  imports: [InitialsPipe, TransactionChartComponent, PerformanceChartComponent, DatePipe, TranslatePipe, NgClass, RouterLink, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly investorService = inject(TransactionService);
  WEB_ROUTES = WEB_ROUTES;
  user: UserProfileData = this.tokenService.getUser();
  pagination: TransactionFilter = {
    pageNumber: 1,
    pageSize: 10,
    filter: {},
    orderByValue: [
      {
        colId: "id",
        sort: "desc",
      },
    ],
  };
  loading = signal<boolean>(false);
  transactions = signal<Transaction[]>([]);


  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading.set(true);
    this.investorService
      .getInvestorTransactionsPaged(this.pagination)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.transactions.set(response.data);
        },
        error: () => { },
      });
  }


}
