import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvestorTransactionsService } from "../../../../../../core/services/investor-transactions.service";
import { DatePipe, DecimalPipe } from "@angular/common";
import { Location } from "@angular/common";
import { InvestorTransaction } from "../../../../../../core/models/investor-transaction";

@Component({
  selector: "app-details",
  imports: [DecimalPipe, DatePipe],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private investorService = inject(InvestorTransactionsService);
  private location = inject(Location);

  transactionId!: number;
  transaction!: InvestorTransaction;
  goBack(): void {
    (this.location as any).back();
  }
  ngOnInit(): void {
    this.transactionId = Number(this.route.snapshot.paramMap.get("id"));

    this.investorService
      .getInvestorTransactionDetails(this.transactionId)
      .subscribe({
        next: (res) => {
          this.transaction = res.data;
        },
        error: () => {
          console.error("Failed to load transaction");
        },
      });
  }
}
