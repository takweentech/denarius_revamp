import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-bank",
  imports: [TranslatePipe],
  templateUrl: "./bank.component.html",
  styleUrl: "./bank.component.scss",
})
export class BankComponent {}
