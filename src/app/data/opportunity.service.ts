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

  getById(id: number): Observable<HttpCustomResponse<Opportunity>> {
    return this.http.get<HttpCustomResponse<Opportunity>>(`${environment.apiUrl}/${this.baseUrl}/GetOpportunityFullDetails${id}`, {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmY2NjMjBiMi1iZDIxLTQzOGMtYjQ3OC0yZjk4YjUwYjE1ZTIiLCJzdWIiOiLZitmI2LPZgSDYp9mE2LLZhdmK2Lkg2K3Ys9mGINi52YrYs9mKIiwiVXNlcklkIjoiODNmYTdjOTUtYjgzYi00YTliLWJlM2YtNmZiMDA3MTcxODgyIiwiRW1haWwiOiJhaG1lZC5hbG11dGFpcmlAZXhhbXBsZS5jb20iLCJNb2JpbGVOdW1iZXIiOiIrOTY2NTEyMzQ1MDAwIiwiZXhwIjoxNzU0Mjk5OTM3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.tpe71mFL0_3UpWqi25H06gwprfIa1-Orq7duz2gJIxw "
      }
    })
  }
}
