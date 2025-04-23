import { Component, OnInit, inject } from "@angular/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-members",
  imports: [],
  templateUrl: "./members.component.html",
  styleUrl: "./members.component.scss",
})
export class MembersComponent extends BaseComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["members"];
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
