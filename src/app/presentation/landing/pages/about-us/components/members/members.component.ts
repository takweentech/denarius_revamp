import { Component, OnInit, inject } from "@angular/core";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../../../../environments/environment";

@Component({
  selector: "app-members",
  imports: [],
  templateUrl: "./members.component.html",
  styleUrl: "./members.component.scss",
})
export class MembersComponent extends BaseComponent implements OnInit {
  CMS_ASSETS_URL = environment.cmsAssetsUrl;
  private readonly activatedRoute = inject(ActivatedRoute);
  content = this.activatedRoute.snapshot.data["content"]["members"];
  constructor() {
    super();
  }

  ngOnInit(): void { }
}
