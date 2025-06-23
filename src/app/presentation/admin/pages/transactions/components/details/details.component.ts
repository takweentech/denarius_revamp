import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TransactionService } from "../../../../../../data/transaction.service";
import { DatePipe, DecimalPipe } from "@angular/common";
import { Location } from "@angular/common";
import { Transaction } from "../../../../../../core/models/transaction";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-details",
  imports: [DatePipe, DecimalPipe, TranslatePipe],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private investorService = inject(TransactionService);
  private location = inject(Location);

  transactionId!: number;
  transaction!: Transaction;
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
