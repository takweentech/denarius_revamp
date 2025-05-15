import { Component, inject } from "@angular/core";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";
import { TranslateModule } from "@ngx-translate/core";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Opportunity } from "../../../../../../../../core/models/opportunity";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TokenService } from "../../../../../../../../core/services/token.service";
import { UserProfileData } from "../../../../../../../../core/models/user";

@Component({
  selector: "app-payment",
  imports: [
    TranslateModule,
    RouterModule,
    DatePipe,
    CurrencyPipe,
    ReactiveFormsModule
  ],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss",
})
export class PaymentComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(TokenService);
  opportunity: Opportunity = this.activatedRoute.parent?.snapshot.data['opportunity']?.data;
  WEB_ROUTES = WEB_ROUTES;
  search: FormControl<number | null> = new FormControl(10);
  user: UserProfileData = this.tokenService.getUser();
  constructor() {
  }


}
