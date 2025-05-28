import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse } from '../core/models/http';
import { InvestmentPaymentResponse } from '../core/models/investment';

@Injectable({
    providedIn: 'root'
})
export class InvestmentService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'Investors';

    invest(id: number): Observable<HttpCustomResponse<{}>> {
        return this.http.get<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/Invest/${id}`);
    }

    payByWallet(opportunityId: number, numStock: number): Observable<HttpCustomResponse<InvestmentPaymentResponse>> {
        return this.http.get<HttpCustomResponse<InvestmentPaymentResponse>>(`${environment.apiUrl}/${this.baseUrl}/PayByWallet`, { params: { opportunityId, numStock } })
    }
}
