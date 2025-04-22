import { Component, OnInit, inject } from "@angular/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-risknotice",
  imports: [],
  templateUrl: "./risknotice.component.html",
  styleUrl: "./risknotice.component.scss",
})
export class RisknoticeComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["risk_notice"];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
