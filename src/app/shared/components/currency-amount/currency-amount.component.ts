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
    if (this.countUp) {
      this.animateCountUp();
    } else {
      this.displayedAmount = this.amount;
    }
  }

  animateCountUp(): void {
    const duration = 2000;
    const fps = 30;
    const steps = Math.floor(duration / fps);
    let step = 0;

    const counter = setInterval(() => {
      step++;
      const progress = step / steps;
      this.displayedAmount = Math.floor(this.amount * progress);

      if (step >= steps) {
        this.displayedAmount = this.amount;
        clearInterval(counter);
      }
    }, fps);
  }

  get iconSizeClass(): string {
    return "currency-icon-size-" + this.size;
  }

  get textMarginClass(): string {
    return this.size === 5 || this.size === 6 ? "mt-1" : "mt-2";
  }
}
