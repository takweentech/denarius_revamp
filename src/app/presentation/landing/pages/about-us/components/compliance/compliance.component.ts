import { Component, OnInit, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "../../../../../../core/base/base.component";

@Component({
  selector: "app-compliance",
  imports: [TranslateModule],
  templateUrl: "./compliance.component.html",
  styleUrl: "./compliance.component.scss",
})
export class ComplianceComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["compliance"];
  constructor() {
    super();
  }

  ngOnInit(): void { }
}
