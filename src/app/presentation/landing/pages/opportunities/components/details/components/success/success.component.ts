import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-success",
  imports: [TranslateModule],
  templateUrl: "./success.component.html",
  styleUrl: "./success.component.scss",
})
export class SuccessComponent {
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
}
