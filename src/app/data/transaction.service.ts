import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import {
  PagedApiResponse,
  Transaction,
  TransactionFilter,
} from "../core/models/transaction";

@Injectable({ providedIn: "root" })
export class TransactionService {
  private baseUrl = `${environment.apiUrl}/InvestorTransactions`;

  constructor(private http: HttpClient) {}

  getInvestorTransactionsPaged(
    payload: TransactionFilter
  ): Observable<PagedApiResponse<Transaction>> {
    return this.http.post<PagedApiResponse<Transaction>>(
      `${this.baseUrl}/GetInvestorTransactionsPaged`,
      payload
    );
  }

  getInvestorTransactionDetails(id: number): Observable<{ data: Transaction }> {
    return this.http.post<{ data: Transaction }>(
      `${this.baseUrl}/GetInvestorTransactionDetails?id=${id}`,
      {}
    );
  }
}
