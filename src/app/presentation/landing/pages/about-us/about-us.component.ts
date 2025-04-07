import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { OverviewComponent } from "./components/overview/overview.component";
import { ValuesComponent } from "./components/values/values.component";
import { MembersComponent } from "./components/members/members.component";
import { ManagementComponent } from "./components/management/management.component";
import { ComplianceComponent } from "../homepage/components/compliance/compliance.component";
import { RisknoticeComponent } from "./components/risknotice/risknotice.component";

@Component({
  selector: "app-about-us",
  imports: [
    TranslateModule,
    OverviewComponent,
    ValuesComponent,
    MembersComponent,
    ManagementComponent,
    ComplianceComponent,
    RisknoticeComponent,
  ],
  templateUrl: "./about-us.component.html",
  styleUrl: "./about-us.component.scss",
})
export class AboutUsComponent {}
