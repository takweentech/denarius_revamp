import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-investment",
  imports: [TranslatePipe],
  templateUrl: "./investment.component.html",
  styleUrl: "./investment.component.scss",
})
export class InvestmentComponent {}
