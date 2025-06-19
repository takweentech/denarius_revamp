import { Component, inject, OnInit, signal } from "@angular/core";
import { UserProfileData } from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { WEB_ROUTES } from "../../../../../../core/constants/routes.constants";
import { DatePipe, DecimalPipe, NgClass, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { finalize, takeUntil } from "rxjs";
import { ProfileService } from "../../../../../../data/profile.service";
import { FormsModule, NgModel } from "@angular/forms";
import { ToastService } from "../../../../../../shared/components/toast/toast.service";
import { WithdrawalService } from "../../../../../../data/Withdrawal.service";
import {
  Transaction,
  TransactionFilter,
} from "../../../../../../core/models/transaction";
import { TransactionService } from "../../../../../../data/transaction.service";

@Component({
  selector: "app-listing",
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass,
    TranslatePipe,
    NgIf,
    DatePipe,
    FormsModule,
    RouterLink,
    NgbPagination,
  ],
  templateUrl: "./listing.component.html",
  styleUrl: "./listing.component.scss",
})
export class ListingComponent extends BaseComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly transactionService = inject(TransactionService);

  private readonly WithdrawalService = inject(WithdrawalService);
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private toastService = inject(ToastService);
  isSubmitting: boolean = false;
  showConfirmModal: boolean = false;
  transactions = signal<Transaction[]>([]);

  user: UserProfileData = this.tokenService.getUser();
  withdrawAmount: number = 0;
  pagination: any = {
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
  investments = signal<any[]>([]);
  loading = signal<boolean>(false);
  total = signal<number>(0);

  loadOperations(): void {
    this.loading.set(true);
    this.profileService
      .getWalletInformation()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: () => {},
      });
  }
  loadTransactions(): void {
    this.loading.set(true);

    const requestPayload: TransactionFilter = {
      ...this.pagination,
      filter: {
        ...this.pagination.filter,
      },
    };

    this.transactionService
      .getInvestorTransactionsPaged(requestPayload)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response) => {
          // ✅ Access the nested response shape
          const result = response.data;
          this.investments.set(result?.data || []);
          this.total.set(result?.totalCount || 0);
        },
        error: (err) => {
          console.error("Failed to load transactions:", err);
          this.investments.set([]);
          this.total.set(0);
        },
      });
  }
  ngOnInit(): void {
    this.loadTransactions();
    this.loadOperations();
  }

  confirmWithdrawal(): void {
    this.isSubmitting = true;
    this.showConfirmModal = false;
    this.WithdrawalService.withdraw(this.withdrawAmount).subscribe({
      next: (response) => {
        const message = response.message?.trim();

        if (response.status === 200) {
          this.toastService.show({
            text: message || "",
            classname: "bg-success text-light",
            icon: "fa-circle-check",
          });

          this.showConfirmModal = false;
        } else {
          this.toastService.show({
            text: message || this.translate.instant("WALLET.WITHDRAW.FAILED"),
            classname: "bg-danger text-light",
            icon: "fa-circle-exclamation",
          });

          this.showConfirmModal = false;
        }

        this.isSubmitting = false;
      },
      error: (err) => {
        console.error("Withdrawal Failed:", err);
        this.toastService.show({
          text: this.translate.instant("WALLET.WITHDRAW.ERROR"),
          classname: "bg-danger text-light",
          icon: "fa-circle-exclamation",
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
