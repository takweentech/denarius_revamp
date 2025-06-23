import { Component, OnInit, inject, signal } from '@angular/core';
import { TokenService } from '../../../../core/services/token.service';
import { UserProfileData } from '../../../../core/models/user';
import { TransactionService } from '../../../../data/transaction.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Transaction, TransactionFilter } from '../../../../core/models/transaction';
import { DecimalPipe, DatePipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { BaseComponent } from '../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-transactions',
  imports: [TranslatePipe, NgClass, RouterModule, DecimalPipe, DatePipe, NgbPaginationModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly investorService = inject(TransactionService);
  pagination: TransactionFilter = {
    pageNumber: 1,
    pageSize: 10,
    filter: {},
    orderByValue: [
      {
        colId: 'id',
        sort: 'desc',
      },
    ],
  };
  WEB_ROUTES = WEB_ROUTES;
  transactions = signal<Transaction[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);
  user: UserProfileData = this.tokenService.getUser();

  loadTransactions(): void {
    this.loading.set(true);
    this.investorService
      .getInvestorTransactionsPaged(this.pagination)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response: any) => {
          const paged = response.data;
          this.transactions.set(paged.data);
          this.total.set(paged.totalCount);
        },
        error: () => {},
      });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadTransactions();
  }
}
