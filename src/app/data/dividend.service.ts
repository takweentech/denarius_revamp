import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';
import { Dividend } from '../core/models/dividend';

@Injectable({
    providedIn: 'root'
})
export class DividendService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'InvestorDividend';

    getPaged(filter?: any): Observable<HttpCustomResponse<HttpPagedResponse<Dividend[]>>> {
        return this.http.post<HttpCustomResponse<HttpPagedResponse<Dividend[]>>>(`${environment.apiUrl}/${this.baseUrl}/DividendsOfInvestor`, filter);
    }

    getById(id: number): Observable<HttpCustomResponse<Dividend>> {
        return this.http.get<HttpCustomResponse<Dividend>>(`${environment.apiUrl}/${this.baseUrl}/InvestorDividendDetails`, { params: { id } })
    }


}
