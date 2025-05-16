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
  @Input() shorten: boolean = false;

  displayedAmount: number = 0;

  ngOnInit(): void {
    if (this.countUp) {
      this.animateCountUp();
    } else {
      this.displayedAmount = this.amount;
    }
  }

  animateCountUp(): void {
    let current = 0;
    const steps = 20;
    const increment = this.amount / steps;
    const interval = setInterval(() => {
      current += increment;
      if (current >= this.amount) {
        this.displayedAmount = this.amount;
        clearInterval(interval);
      } else {
        this.displayedAmount = current;
      }
    }, 30);
  }

  // get formattedAmount(): string {
  //   if (!this.shorten) return Math.round(this.displayedAmount).toLocaleString();
  get formattedAmount(): string {
    if (!this.shorten) return this.displayedAmount.toLocaleString();
    const abs = Math.abs(this.displayedAmount);

    const format = (num: number, suffix: string): string => {
      const rounded = parseFloat(num.toFixed(2));
      return (
        (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toString()) + suffix
      );
    };

    if (abs >= 1_000_000_000)
      return format(this.displayedAmount / 1_000_000_000, "B");
    if (abs >= 1_000_000) return format(this.displayedAmount / 1_000_000, "M");
    if (abs >= 1_000) return format(this.displayedAmount / 1_000, "K");

    return Math.round(this.displayedAmount).toLocaleString();
  }

  get iconSizeClass(): string {
    return "currency-icon-size-" + this.size;
  }

  // get textMarginClass(): string {
  //   return this.size === 5 || this.size === 6 ? "mt-1" : "mt-2";
  // }
}
