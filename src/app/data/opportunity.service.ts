import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';
import { Opportunity, OpportunityFilter } from '../core/models/opportunity';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'Opportunity';

  getPaged(filter?: OpportunityFilter): Observable<HttpCustomResponse<HttpPagedResponse<Opportunity[]>>> {
    return this.http.post<HttpCustomResponse<HttpPagedResponse<Opportunity[]>>>(`${environment.apiUrl}/${this.baseUrl}/GetPaged`, filter);
  }
}
