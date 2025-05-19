import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ApiResponse,
  InvestorTransaction,
  InvestorTransactionsPagedRequest,
  InvestorTransactionsPagedResponse,
} from "../models/investor-transaction";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class InvestorTransactionsService {
  private baseUrl = `${environment.apiUrl}/InvestorTransactions`;
  constructor(private http: HttpClient) {}

  getInvestorTransactionsPaged(
    payload: InvestorTransactionsPagedRequest
  ): Observable<ApiResponse<InvestorTransactionsPagedResponse>> {
    return this.http.post<ApiResponse<InvestorTransactionsPagedResponse>>(
      `${this.baseUrl}/GetInvestorTransactionsPaged`,
      payload
    );
  }

  getInvestorTransactionDetails(
    id: number
  ): Observable<ApiResponse<InvestorTransaction>> {
    return this.http.post<ApiResponse<InvestorTransaction>>(
      `${this.baseUrl}/GetInvestorTransactionDetails?id=${id}`,
      {}
    );
  }
}
