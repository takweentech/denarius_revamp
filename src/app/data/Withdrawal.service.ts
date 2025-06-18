import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpCustomResponse } from "../core/models/http";

@Injectable({
  providedIn: "root",
})
export class WithdrawalService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = "InvestorWithdrawal";

  withdraw(amount: number): Observable<HttpCustomResponse<string>> {
    const params = new HttpParams().set("amount", amount.toString());

    return this.http.post<HttpCustomResponse<string>>(
      `${environment.apiUrl}/${this.baseUrl}/Withdrawal`,
      {},
      { params }
    );
  }
}
