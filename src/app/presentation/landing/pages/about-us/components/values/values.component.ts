import { Component, OnInit, inject } from "@angular/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-values",
  imports: [],
  templateUrl: "./values.component.html",
  styleUrl: "./values.component.scss",
})
export class ValuesComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["values"];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
