import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction, TransactionFilter } from '../core/models/transaction';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = `${environment.apiUrl}/InvestorTransactions`;
  constructor(private http: HttpClient) {}

  getInvestorTransactionsPaged(
    payload: TransactionFilter
  ): Observable<HttpCustomResponse<HttpPagedResponse<Transaction[]>>> {
    return this.http.post<HttpCustomResponse<HttpPagedResponse<Transaction[]>>>(
      `${this.baseUrl}/GetInvestorTransactionsPaged`,
      payload
    );
  }

  getInvestorTransactionDetails(id: number): Observable<HttpPagedResponse<Transaction>> {
    return this.http.post<HttpPagedResponse<Transaction>>(`${this.baseUrl}/GetInvestorTransactionDetails?id=${id}`, {});
  }
}
