import { Component } from "@angular/core";
import { WEB_ROUTES } from "../../../../../../../../core/constants/routes.constants";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-payment",
  imports: [TranslateModule, CommonModule, RouterModule],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss",
})
export class PaymentComponent {
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
  paymentSchedule = [
    {
      id: 1,
      amount: 105,
      agencyFee: 1.5,
      vat: 0.8,
      netProfit: 102.7,
      distributionDate: "01/03/2025",
    },
    {
      id: 2,
      amount: 105,
      agencyFee: 1.5,
      vat: 0.8,
      netProfit: 102.7,
      distributionDate: "01/05/2025",
    },
    {
      id: 3,
      amount: 105,
      agencyFee: 1.5,
      vat: 0.8,
      netProfit: 102.7,
      distributionDate: "01/03/2025",
    },
    {
      id: 4,
      amount: 105,
      agencyFee: 1.5,
      vat: 0.8,
      netProfit: 102.7,
      distributionDate: "01/05/2025",
    },
    {
      id: 5,
      amount: 105,
      agencyFee: 1.5,
      vat: 0.8,
      netProfit: 102.7,
      distributionDate: "01/03/2025",
    },
  ];
}
