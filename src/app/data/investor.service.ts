import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';
import { Investment, InvestmentFilter } from '../core/models/investment';

@Injectable({
  providedIn: 'root',
})
export class InvestorService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'InvestorOpportunity';

  getPaged(filter?: InvestmentFilter): Observable<HttpCustomResponse<HttpPagedResponse<Investment[]>>> {
    return this.http.post<HttpCustomResponse<HttpPagedResponse<Investment[]>>>(
      `${environment.apiUrl}/${this.baseUrl}/GetInvestorOpportunitiesPaged`,
      filter
    );
  }

  getById(id: number): Observable<HttpCustomResponse<Investment>> {
    return this.http.get<HttpCustomResponse<Investment>>(
      `${environment.apiUrl}/${this.baseUrl}/InvestorOpportunityDetails${id}`
    );
  }
}
