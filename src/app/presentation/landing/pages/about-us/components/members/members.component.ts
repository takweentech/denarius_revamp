import { Component, OnInit, inject } from "@angular/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ActivatedRoute } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-members",
  imports: [NgIf],
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
