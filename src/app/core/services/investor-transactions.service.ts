import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvestorTransactionsPagedRequest } from "../models/investor-transaction";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class InvestorTransactionsService {
  private baseUrl = `${environment.apiUrl}/InvestorTransactions`;
  constructor(private http: HttpClient) {}

  getInvestorTransactionsPaged(
    payload: InvestorTransactionsPagedRequest
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/GetInvestorTransactionsPaged`,
      payload
    );
  }
  getInvestorTransactionDetails(id: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/GetInvestorTransactionDetails?id=${id}`,
      {}
    );
  }
}
