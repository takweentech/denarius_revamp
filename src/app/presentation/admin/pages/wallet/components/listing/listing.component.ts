import { Component, inject, OnInit, signal } from '@angular/core';
import { UserProfileData, UserWalletData } from '../../../../../../core/models/user';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { ProfileService } from '../../../../../../data/profile.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { Transaction } from '../../../../../../core/models/transaction';
import { TokenService } from '../../../../../../core/services/token.service';
import { TransactionService } from '../../../../../../data/transaction.service';
import { WithdrawalService } from '../../../../../../data/withdrawal.service';
import { TransactionType } from '../../../../../../core/enums/investor.enums';
@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [DecimalPipe, NgClass, TranslatePipe, NgIf, DatePipe, FormsModule, RouterLink, NgbPagination],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss',
})
export class ListingComponent extends BaseComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly tokenService = inject(TokenService);
  private readonly withdrawalService = inject(WithdrawalService);
  private readonly profileService = inject(ProfileService);
  private readonly transactionservice = inject(TransactionService);
  private toastService = inject(ToastService);
  walletData: UserWalletData = {} as UserWalletData;
  user: UserProfileData = this.tokenService.getUser();

  isSubmitting: boolean = false;
  showConfirmModal: boolean = false;
  withdrawAmount: number = 0;

  pagination: any = {
    pageNumber: 1,
    pageSize: 5,
    filter: {},
    orderByValue: [
      {
        colId: 'id',
        sort: 'desc',
      },
    ],
  };
  WEB_ROUTES = WEB_ROUTES;
  investments = signal<any[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.loadTransactions();
    this.loadOperations();
  }
  loadOperations(): void {
    this.loading.set(true);
    this.profileService
      .getWalletInformation()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: res => {
          const data: UserWalletData = res.data;
          this.walletData = data;
        },
        error: () => { },
      });
  }

  loadTransactions(): void {
    this.loading.set(true);
    this.transactionservice
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

          this.transactions.set(formatted.filter(item => item.transactionType === TransactionType.WITHDRAWAL));
        },
        error: () => { },
      });
  }

  confirmWithdrawal(): void {
    this.isSubmitting = true;
    this.showConfirmModal = false;
    this.withdrawalService
      .withdraw(this.withdrawAmount)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          const message = response.message?.trim();

          if (response.status === 200) {
            this.toastService.show({
              text: message || '',
              classname: 'bg-success text-light',
              icon: 'fa-circle-check',
            });

            this.showConfirmModal = false;
          } else {
            this.toastService.show({
              text: message || this.translate.instant('WALLET.WITHDRAW.FAILED'),
              classname: 'bg-danger text-light',
              icon: 'fa-circle-exclamation',
            });

            this.showConfirmModal = false;
          }

          this.isSubmitting = false;
        },
        error: err => {
          console.error('Withdrawal Failed:', err);
          this.toastService.show({
            text: this.translate.instant('WALLET.WITHDRAW.ERROR'),
            classname: 'bg-danger text-light',
            icon: 'fa-circle-exclamation',
          });

          this.isSubmitting = false;
          this.showConfirmModal = false;
        },
      });
  }

  goToPage(page: number): void {
    this.pagination.pageNumber = page;
    this.loadOperations();
  }

  onBackdropClick(event: MouseEvent): void {
    this.showConfirmModal = false;
  }
}
