import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";
import { Opportunity } from "../../../../../../../../core/models/opportunity";
import { TokenService } from "../../../../../../../../core/services/token.service";

@Component({
  selector: "app-main",
  imports: [
    TranslateModule,
    NgbAccordionModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(TokenService);
  opportunity: Opportunity = this.activatedRoute.snapshot.data['opportunity']?.data;
  WEB_ROUTES = WEB_ROUTES;
  selectedOpportunity = {
    image: "assets/images/tower.svg",
    issuanceNumber: 2,
    durationInMonths: 18,
    displayName: "مرابحة عقاري 2025-001",
    annualReturn: 100,
    rri: 13.5,
    roi: 13.5,
    expectedReturn: 13.5,
    dueDate: "0",
    startDate: new Date("2025-03-10").toISOString(),
    endDate: "",
    dividendDate: "",
    displaySummary: "",
    status: "",
    miniSuccess: 0,
    businessSector: 0,
    investorMinLimit: 0,
    stockCount: 0,
    stockValue: 0,
    programName: null,
    dividends: [],
    id: 1,
  };
  isAuthenticated: boolean = this.tokenService.isAuthenticated();


}
