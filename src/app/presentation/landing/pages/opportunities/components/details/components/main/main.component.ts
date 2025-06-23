import { DecimalPipe, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";
import { Opportunity } from "../../../../../../../../core/models/opportunity";
import { TokenService } from "../../../../../../../../core/services/token.service";
import { BaseComponent } from "../../../../../../../../core/base/base.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-main",
  imports: [
    DecimalPipe,
    TranslateModule,
    NgbAccordionModule,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent extends BaseComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  numStock: FormControl<number | null> = new FormControl(0);
  opportunity: Opportunity =
    this.activatedRoute.snapshot.data["opportunity"]?.data;
  WEB_ROUTES = WEB_ROUTES;
  isAuthenticated: boolean = this.tokenService.isAuthenticated();

  onSignIn(): void {
    this.router.navigate(
      ["/" + WEB_ROUTES.AUTH.ROOT + "/" + WEB_ROUTES.AUTH.SIGN_IN],
      { state: { redirectionUrl: this.router.url } }
    );
  }

  onSignUp(): void {
    this.router.navigate(
      ["/" + WEB_ROUTES.AUTH.ROOT + "/" + WEB_ROUTES.AUTH.SIGN_UP],
      { state: { redirectionUrl: this.router.url } }
    );
  }

  onInvest(): void {
    this.router.navigateByUrl(
      "/" +
        WEB_ROUTES.OPPORTUNITIES.ROOT +
        "/" +
        WEB_ROUTES.OPPORTUNITIES.DETAILS +
        "/" +
        this.opportunity.id +
        "/" +
        WEB_ROUTES.OPPORTUNITIES.PAYMENT
    );
  }
}
