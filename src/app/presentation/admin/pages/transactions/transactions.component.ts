import { Component, OnInit, inject } from "@angular/core";
import { TokenService } from "../../../../core/services/token.service";
import { UserProfileData } from "../../../../core/models/user";
import { InvestorTransactionsService } from "../../../../core/services/investor-transactions.service";
import { InvestorTransactionsPagedRequest } from "../../../../core/models/investor-transaction";
import { CommonModule } from "@angular/common";
import { CurrencyAmountComponent } from "../../../../shared/components/currency-amount/currency-amount.component";
import { RouterModule } from "@angular/router";
import { WEB_ROUTES } from "../../../../core/constants/routes.constants";
@Component({
  selector: "app-transactions",
  imports: [CommonModule, RouterModule, CurrencyAmountComponent],
  templateUrl: "./transactions.component.html",
  styleUrl: "./transactions.component.scss",
})
export class TransactionsComponent implements OnInit {
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalCount = 0;
  pages: number[] = [];
  WEB_ROUTES = WEB_ROUTES;

  private generatePages(): void {
    const pages: number[] = [];

    for (let i = 1; i <= Math.min(5, this.totalPages); i++) {
      pages.push(i);
    }

    if (this.totalPages > 5) {
      pages.push(-1);
      pages.push(this.totalPages);
    }

    this.pages = pages;
  }
  private readonly tokenService = inject(TokenService);
  private readonly investorService = inject(InvestorTransactionsService);
  transactions: any[] = [];
  loading = false;
  user: UserProfileData = this.tokenService.getUser();

  loadTransactions(): void {
    const payload: InvestorTransactionsPagedRequest = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      filter: {
        statusId: 0,
        investorId: 0,
        paymentMethod: 0,
        startDate: "2025-01-01T00:00:00Z",
        endDate: "2025-12-31T23:59:59Z",
        nameEn: "",
        nameAr: "",
        isDeleted: false,
      },
      orderByValue: [
        {
          colId: "amount",
          sort: "desc" as const,
        },
      ],
    };

    this.loading = true;

    this.investorService.getInvestorTransactionsPaged(payload).subscribe({
      next: (res) => {
        this.transactions = res.data?.data || [];
        this.totalCount = res.data?.totalCount || 0;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.generatePages();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  ngOnInit(): void {
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
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadTransactions();
  }
}
