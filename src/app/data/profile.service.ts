import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse } from '../core/models/http';
import { UserBankData, UserBasicProfileData, UserInvestmentData, UserProfileData } from '../core/models/user';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'Profile';

    getUserProfile(): Observable<HttpCustomResponse<UserProfileData>> {
        return this.http.get<HttpCustomResponse<UserProfileData>>(`${environment.apiUrl}/${this.baseUrl}/GetMainProfile`)
    }

    getBasicPersonalInformation(): Observable<HttpCustomResponse<UserBasicProfileData>> {
        return this.http.get<HttpCustomResponse<UserBasicProfileData>>(`${environment.apiUrl}/${this.baseUrl}/GetBasicPersonalInformation`)
    }

    getBankInformation(): Observable<HttpCustomResponse<UserBankData>> {
        return this.http.get<HttpCustomResponse<UserBankData>>(`${environment.apiUrl}/${this.baseUrl}/GetBankInformation`)
    }

    getInvestmentInformation(): Observable<HttpCustomResponse<UserInvestmentData>> {
        return this.http.get<HttpCustomResponse<UserInvestmentData>>(`${environment.apiUrl}/${this.baseUrl}/GetInvestmentKnowledge`)
    }



}
