import { Component, OnInit, inject } from "@angular/core";
import { CurrencyAmountComponent } from "../../../../../../shared/components/currency-amount/currency-amount.component";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../../../../../../core/base/base.component";

@Component({
  selector: "app-overview",
  imports: [CurrencyAmountComponent],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["overview"];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
