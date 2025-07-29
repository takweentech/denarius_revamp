import { Component, OnInit, inject, signal } from '@angular/core';
import { TokenService } from '../../../../core/services/token.service';
import { UserInvestmentStatisticsData, UserProfileData } from '../../../../core/models/user';
import { TransactionService } from '../../../../data/transaction.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Transaction, TransactionFilter } from '../../../../core/models/transaction';
import { DecimalPipe, DatePipe, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WEB_ROUTES } from '../../../../core/constants/routes.constants';
import { BaseComponent } from '../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LookupService } from '../../../../core/services/lookup.service';
import { LangPipe } from '../../../../shared/pipes/lang.pipe';
import { ProfileService } from '../../../../data/profile.service';
import { Lookup } from '../../../../core/models/lookup';
@Component({
  selector: 'app-transactions',
  imports: [TranslatePipe, NgClass, RouterModule, DecimalPipe, DatePipe, NgbPaginationModule, LangPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly lookupService = inject(LookupService);
  private readonly investorService = inject(TransactionService);
  private readonly profileService = inject(ProfileService);
  statistics = signal<UserInvestmentStatisticsData | null>(null);

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
  transactionTypes = signal<Lookup[]>([]);
  loadTransactions(): void {
    this.loading.set(true);
    this.investorService
      .getInvestorTransactionsPaged(this.pagination)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: response => {
          this.total.set(response.data.totalCount);
          const formatted = response.data.data.map(tx => ({
            ...tx,
            description: tx.description ? tx.description.replace(/,/g, '<br>') : null,
          }));

          this.transactions.set(formatted);
        },
        error: () => {},
      });
  }
  loadStatistics(): void {
    this.profileService
      .getInvestmentStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.statistics.set(response.data);
        },
        error: () => {},
      });
  }
  ngOnInit(): void {
    this.loadStatistics();
    this.loadTransactions();
    this.lookupService.getTransactionType().subscribe(res => {
      const types = [
        {
          value: undefined,
          englishName: 'TRANSACTIONS.FILTER.ALL',
          arabicName: 'TRANSACTIONS.FILTER.ALL',
          active: true,
        },
        ...res.map(t => ({
          value: t.id, // 👈 use id as value
          englishName: t.englishName,
          arabicName: t.arabicName,
          active: false,
        })),
      ];
      this.transactionTypes.set(types);
    });
  }
  loadTransactionTypes(): void {
    this.lookupService.getTransactionType().subscribe(res => {
      const types = [
        {
          value: undefined,
          englishName: 'TRANSACTIONS.FILTER.ALL',
          arabicName: 'TRANSACTIONS.FILTER.ALL',
          active: true,
        },
        ...res.map(t => ({
          value: t.id,
          englishName: t.englishName,
          arabicName: t.arabicName,
          active: false,
        })),
      ];
      this.transactionTypes.set(types);
    });
  }
  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadTransactions();
  }

  // onFilterByStatus(status?: number, index?: number): void {
  //   this.statusList = this.statusList.map((item) => ({
  //     ...item,
  //     active: false,
  //   }));
  //   this.statusList[index as number].active = true;
  //   this.pagination.filter.statusId = status;
  //   this.loadTransactions();
  // }
  onFilterByType(type?: number, index?: number): void {
    const updatedTypes = this.transactionTypes().map((item, i) => ({
      ...item,
      active: i === index,
    }));
    this.transactionTypes.set(updatedTypes);

    // 👇 update the payload
    this.pagination.filter.type = type;
    this.loadTransactions();
  }
}
