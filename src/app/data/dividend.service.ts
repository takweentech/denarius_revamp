import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';

@Injectable({
    providedIn: 'root'
})
export class DividendService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'InvestorDividend';

    getPaged(filter?: any): Observable<HttpCustomResponse<HttpPagedResponse<any[]>>> {
        return this.http.post<HttpCustomResponse<HttpPagedResponse<any[]>>>(`${environment.apiUrl}/${this.baseUrl}/DividendsOfInvestor`, filter);
    }

    getById(id: number): Observable<HttpCustomResponse<any>> {
        return this.http.get<HttpCustomResponse<any>>(`${environment.apiUrl}/${this.baseUrl}/InvestorDividendDetails`, { params: { id } })
    }


}
