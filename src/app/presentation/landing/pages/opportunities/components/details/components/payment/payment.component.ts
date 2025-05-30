import { Component, inject, OnInit } from "@angular/core";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";
import { TranslateModule } from "@ngx-translate/core";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Opportunity } from "../../../../../../../../core/models/opportunity";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { TokenService } from "../../../../../../../../core/services/token.service";
import { UserProfileData } from "../../../../../../../../core/models/user";
import { BaseComponent } from "../../../../../../../../core/base/base.component";
import { InvestmentService } from "../../../../../../../../data/investment.service";
import { takeUntil } from "rxjs";
import { SuccessComponent } from "../success/success.component";
import { InvestmentPaymentResponse, InvestmentResponse } from "../../../../../../../../core/models/investment";
import { ToastService } from "../../../../../../../../shared/components/toast/toast.service";

@Component({
  selector: "app-payment",
  imports: [
    TranslateModule,
    RouterModule,
    DatePipe,
    CurrencyPipe,
    ReactiveFormsModule,
    SuccessComponent
  ],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss",
})
export class PaymentComponent extends BaseComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(TokenService);
  private readonly investmentService = inject(InvestmentService);
  private toastService = inject(ToastService);

  opportunity: Opportunity = this.activatedRoute.parent?.snapshot.data['opportunity']?.data;
  investment: InvestmentResponse = this.activatedRoute.parent?.snapshot.data['investment']?.data;
  WEB_ROUTES = WEB_ROUTES;
  numStock: FormControl<number | null> = new FormControl(0, Validators.required);
  terms: FormControl<boolean | null> = new FormControl(false, Validators.requiredTrue);
  user: UserProfileData = this.tokenService.getUser();
  mode: 'payment' | 'success' = 'payment';
  paymentResponse!: InvestmentPaymentResponse;
  ngOnInit(): void {
  }


  onConfirm() {
    this.investmentService.payByWallet(this.opportunity.id, Number(this.numStock.value)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.paymentResponse = response.data;
          this.mode = 'success';
        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light', icon: 'fa-circle-exclamation' });
        }
      }
    })
  }


}
