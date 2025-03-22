import { Component, OnInit, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { InvestmentOpportunity } from "./investment-opportunities.model";

@Component({
  selector: "app-investment-opportunities",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: "./investment-opportunities.component.html",
})
export class InvestmentOpportunitiesComponent {
  // private httpClint = inject(HttpClient);

  // opportunities = signal<InvestmentOpportunity[]>([]);
  // ngOnInit() {
  //   const subscribtion = this.httpClint
  //     .get<{ data: InvestmentOpportunity[] }>(
  //       "https://sharikekapi.paramej.com/api/v1/Opportunity/GetAll"
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response.data);
  //         this.opportunities.set(response.data);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //     });
  // }

  opportunities: InvestmentOpportunity[] = [
    {
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
    },
    {
      image: "assets/images/tower.svg",
      issuanceNumber: 3,
      durationInMonths: 18,
      displayName: "مرابحة عقاري 2025-002",
      annualReturn: 30,
      rri: 13.5,
      roi: 13.5,
      expectedReturn: 13.5,
      dueDate: "10",
      startDate: new Date("2025-03-20").toISOString(),
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
      id: 2,
    },
    {
      image: "assets/images/tower.svg",
      issuanceNumber: 4,
      durationInMonths: 18,
      displayName: "مرابحة عقاري 2025-003",
      annualReturn: 100,
      rri: 13.5,
      roi: 13.5,
      expectedReturn: 13.5,
      dueDate: "0",
      startDate: new Date("2025-04-01").toISOString(),
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
      id: 3,
    },
    {
      image: "assets/images/tower.svg",
      issuanceNumber: 5,
      durationInMonths: 12,
      displayName: "مرابحة عقاري 2025-004",
      annualReturn: 50,
      rri: 10.2,
      roi: 10.2,
      expectedReturn: 10.2,
      dueDate: "15",
      startDate: new Date("2025-04-15").toISOString(),
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
      id: 4,
    },
    {
      image: "assets/images/tower.svg",
      issuanceNumber: 6,
      durationInMonths: 24,
      displayName: "مرابحة عقاري 2025-005",
      annualReturn: 75,
      rri: 12.8,
      roi: 12.8,
      expectedReturn: 12.8,
      dueDate: "5",
      startDate: new Date("2025-05-01").toISOString(),
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
      id: 5,
    },
    {
      image: "assets/images/tower.svg",
      issuanceNumber: 7,
      durationInMonths: 24,
      displayName: "مرابحة عقاري 2025-005",
      annualReturn: 75,
      rri: 12.8,
      roi: 12.8,
      expectedReturn: 12.8,
      dueDate: "5",
      startDate: new Date("2025-05-01").toISOString(),
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
      id: 5,
    },
  ];
}
