import { Component, OnInit, Pipe, inject } from "@angular/core";
import { TokenService } from "../../../../core/services/token.service";
import { UserProfileData } from "../../../../core/models/user";
import { InvestorTransactionsService } from "../../../../core/services/investor-transactions.service";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import {
  InvestorTransactionsPagedRequest,
  PaginationConfig,
} from "../../../../core/models/investor-transaction";
import { DecimalPipe, DatePipe, NgClass, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
@Component({
  selector: "app-transactions",
  imports: [
    NgClass,
    RouterModule,
    DecimalPipe,
    DatePipe,
    NgIf,
    NgbPaginationModule,
  ],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
})
export class TransactionsComponent implements OnInit {
  pagination: PaginationConfig = {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalCount: 0,
    pages: [],
  };
  WEB_ROUTES = WEB_ROUTES;

  private readonly tokenService = inject(TokenService);
  private readonly investorService = inject(InvestorTransactionsService);
  transactions: any[] = [];
  loading = false;
  user: UserProfileData = this.tokenService.getUser();

  loadTransactions(): void {
    const filter = {
      statusId: 0,
      investorId: 0,
      paymentMethod: 0,
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2025-12-31T23:59:59Z",
      nameEn: "",
      nameAr: "",
      isDeleted: false,
    };

    const payload: InvestorTransactionsPagedRequest = {
      pageNumber: this.pagination.currentPage,
      pageSize: this.pagination.pageSize,
      filter,
      orderByValue: [
        {
          colId: "amount",
          sort: "desc" as const,
        },
      ],
    };

    this.loading = true;

    this.investorService.getInvestorTransactionsPaged(payload).subscribe({
      next: (res: any) => {
        const data = res.data?.data || [];

        this.transactions = data.map((tx: any) => ({
          ...tx,
          typeLabel: this.getTypeLabel(tx.transactionType),
          accountLabel: this.getAccountLabel(
            tx.transactionMethod,
            tx.accountNumber
          ),
        }));

        const totalCount = res.data?.totalCount || 0;
        const totalPages = Math.ceil(totalCount / this.pagination.pageSize);

        this.pagination.totalCount = totalCount;
        this.pagination.totalPages = totalPages;

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  ngOnInit(): void {
    this.transactions = this.transactions.map((tx) => ({
      ...tx,
      typeLabel: this.getTypeLabel(tx.transactionType),
      accountLabel: this.getAccountLabel(
        tx.transactionMethod,
        tx.accountNumber
      ),
    }));
    this.loadTransactions();
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case "Withdrawal":
        return "Withdrawal";
      case "Invest":
        return "Investment";
      case "Profit":
        return "Profit";
      default:
        return type;
    }
  }

  getAccountLabel(method: string, acc: string | null): string {
    if (method === "Wallet") return `Wallet ${acc || ""}`;
    if (method === "Card") return `Card ${acc || ""}`;
    if (method === "Bank") return `Bank ${acc || ""}`;
    return acc || "-";
  }
  goToPage(page: number): void {
    this.pagination.currentPage = page;
    this.loadTransactions();
  }
}
