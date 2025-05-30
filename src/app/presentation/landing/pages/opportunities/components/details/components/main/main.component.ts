import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";
import { Opportunity } from "../../../../../../../../core/models/opportunity";
import { TokenService } from "../../../../../../../../core/services/token.service";
import { BaseComponent } from "../../../../../../../../core/base/base.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { InvestmentResponse } from "../../../../../../../../core/models/investment";

@Component({
  selector: "app-main",
  imports: [
    TranslateModule,
    NgbAccordionModule,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent extends BaseComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  numStock: FormControl<number | null> = new FormControl(0);
  opportunity: Opportunity = this.activatedRoute.snapshot.data['opportunity']?.data;
  investment: InvestmentResponse = this.activatedRoute.snapshot.data['investment']?.data;
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

  onSignIn(): void {
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT + '/' + WEB_ROUTES.AUTH.SIGN_IN], { state: { redirectionUrl: this.router.url } })
  }

  onSignUp(): void {
    this.router.navigate(['/' + WEB_ROUTES.AUTH.ROOT + '/' + WEB_ROUTES.AUTH.SIGN_UP], { state: { redirectionUrl: this.router.url } })
  }

  onInvest(): void {
    this.router.navigateByUrl('/' + WEB_ROUTES.OPPORTUNITIES.ROOT + '/' + WEB_ROUTES.OPPORTUNITIES.DETAILS + '/' + this.opportunity.id + '/' + WEB_ROUTES.OPPORTUNITIES.PAYMENT)
  }
}
