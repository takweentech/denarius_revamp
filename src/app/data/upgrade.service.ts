import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';
import { UpgradeRequest, UpgradeRequestFilter, UpgradeRequestPayload } from '../core/models/upgrade';

@Injectable({
    providedIn: 'root'
})
export class UpgradeService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'InvestorUpgradeRequest';


    create(payload: FormData): Observable<HttpCustomResponse<{}>> {
        return this.http.post<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/AddUpgradeRequest`, payload)
    }

    getAll(): Observable<HttpCustomResponse<UpgradeRequest[]>> {
        return this.http.get<HttpCustomResponse<UpgradeRequest[]>>(`${environment.apiUrl}/${this.baseUrl}/GetAll`)
    }

    getPaged(filter?: UpgradeRequestFilter): Observable<HttpCustomResponse<HttpPagedResponse<UpgradeRequest[]>>> {
        return this.http.post<HttpCustomResponse<HttpPagedResponse<UpgradeRequest[]>>>(`${environment.apiUrl}/${this.baseUrl}/GetPaged`, filter);
    }

    getById(id: number): Observable<HttpCustomResponse<UpgradeRequest>> {
        return this.http.get<HttpCustomResponse<UpgradeRequest>>(`${environment.apiUrl}/${this.baseUrl}/GetOpportunityForPublicPageById${id}`)
    }
}
