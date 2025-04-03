import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  imports: [CommonModule],
  selector: "app-currency-amount",
  templateUrl: "./currency-amount.component.html",
  styleUrls: ["./currency-amount.component.scss"],
})
export class CurrencyAmountComponent implements OnInit {
  @Input() amount: number = 0;
  @Input() size: number = 5;
  @Input() extraClass: string = "";
  @Input() countUp: boolean = false;

  displayedAmount: number = 0;

  ngOnInit(): void {
  }


  get iconSizeClass(): string {
    return "currency-icon-size-" + this.size;
  }

  get textMarginClass(): string {
    return this.size === 5 || this.size === 6 ? "mt-1" : "mt-2";
  }
}
