import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse } from '../core/models/http';
import {
  UserBankData,
  UserBasicProfileData,
  UserInvestmentData,
  UserInvestmentStatisticsData,
  UserPassword,
  UserPersonalData,
  UserProfileData,
  UserWalletData,
} from '../core/models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'Profile';

  getUserProfile(): Observable<HttpCustomResponse<UserProfileData>> {
    return this.http.get<HttpCustomResponse<UserProfileData>>(`${environment.apiUrl}/${this.baseUrl}/GetMainProfile`);
  }

  getWalletInformation(): Observable<HttpCustomResponse<UserWalletData>> {
    return this.http.get<HttpCustomResponse<UserWalletData>>(
      `${environment.apiUrl}/${this.baseUrl}/GetWalletInformation`
    );
  }

  getInvestmentStatistics(): Observable<HttpCustomResponse<UserInvestmentStatisticsData>> {
    return this.http.get<HttpCustomResponse<UserInvestmentStatisticsData>>(
      `${environment.apiUrl}/${this.baseUrl}/GetInvestmentStatistics`
    );
  }

  getPersonalInformation(): Observable<HttpCustomResponse<UserPersonalData>> {
    return this.http.get<HttpCustomResponse<UserPersonalData>>(
      `${environment.apiUrl}/${this.baseUrl}/GetPersonalInformation`
    );
  }

  savePersonalInformation(payload: UserBasicProfileData): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/SetPersonalInformation`,
      payload
    );
  }

  getBasicPersonalInformation(): Observable<HttpCustomResponse<UserBasicProfileData>> {
    return this.http.get<HttpCustomResponse<UserBasicProfileData>>(
      `${environment.apiUrl}/${this.baseUrl}/GetBasicPersonalInformation`
    );
  }

  saveBasicPersonalInformation(payload: UserBasicProfileData): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/SetBasicPersonalInformation`,
      payload
    );
  }

  getBankInformation(): Observable<HttpCustomResponse<UserBankData>> {
    return this.http.get<HttpCustomResponse<UserBankData>>(`${environment.apiUrl}/${this.baseUrl}/GetBankInformation`);
  }

  saveBankInformation(payload: UserBankData): Observable<HttpCustomResponse<UserBankData>> {
    return this.http.post<HttpCustomResponse<UserBankData>>(
      `${environment.apiUrl}/${this.baseUrl}/SetBankInformation`,
      payload
    );
  }

  getInvestmentInformation(): Observable<HttpCustomResponse<UserInvestmentData>> {
    return this.http.get<HttpCustomResponse<UserInvestmentData>>(
      `${environment.apiUrl}/${this.baseUrl}/GetInvestmentKnowledge`
    );
  }

  saveInvestmentInformation(payload: UserInvestmentData): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/SetInvestmentKnowledge`,
      payload
    );
  }

  saveProfileImage(path: string): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/SetImageProfile?path=${encodeURIComponent(path)}`,
      {}
    );
  }

  getProfileImage(): Observable<HttpCustomResponse<{}>> {
    return this.http.get<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/GetImageProfile`);
  }
}
