import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse, HttpPagedResponse } from '../core/models/http';
import { Opportunity, OpportunityFilter } from '../core/models/opportunity';
import { IndividualInitialSignUpDto } from '../core/models/registration';

@Injectable({
    providedIn: 'root'
})
export class RegistrationApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'Accounts';

    initialIndividualInvestorSignUp(data: IndividualInitialSignUpDto): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${this.baseUrl}/InitialIndividualInvestorSignUp`, data)
    }
}
