import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse } from '../core/models/http';
import {
  CompanyFinalizationDto,
  CompanyInitialSignUpDto,
  CompanyOtpSignUpDto,
  IndividualCompletionDto,
  IndividualFinalizationDto,
  IndividualInitialSignUpDto,
  IndividualOtpSignUpDto,
  SignInDto,
} from '../core/models/registration';
@Injectable({
  providedIn: 'root',
})
export class RegistrationApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'Accounts';

  signIn(token: string, otp: string, requestId: string): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/Login`,
      {},
      { headers: { Authorization: token }, params: { otp, requestId } }
    );
  }

  validateSignIn(data: SignInDto): Observable<HttpCustomResponse<{ token: string; requestId: string }>> {
    return this.http.post<HttpCustomResponse<{ token: string; requestId: string }>>(
      `${environment.apiUrl}/${this.baseUrl}/ValidateLogin`,
      data
    );
  }

  // Individual
  initialIndividualInvestorSignUp(data: IndividualInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/InitialIndividualInvestorSignUp`,
      data
    );
  }

  verifyIndividualInvestorOTP(
    data: IndividualOtpSignUpDto,
    token?: string,
    otpId?: string
  ): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/VerifyIndividualInvestorOTP`,
      { ...data, otpId },
      { headers: { Authorization: token as string } }
    );
  }

  completeIndividualInvestorRegestration(
    data: IndividualCompletionDto,
    token?: string
  ): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/CompleteIndividualInvestorRegestrationStep`,
      data,
      { headers: { Authorization: token as string } }
    );
  }

  finalizeIndividualInvestorRegestration(
    data: IndividualFinalizationDto,
    token?: string,
    otpId?: string,
    otp?: string
  ): Observable<HttpCustomResponse<{}>> {
    const body = { ...data };
    delete body.otp;
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/FinalizeIndividualInvestorRegestration`,
      body,
      { params: { otpId: otpId as string, otp: otp as string }, headers: { Authorization: token as string } }
    );
  }

  // Company
  initialCompanyInvestorSignUp(data: CompanyInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/InitialCompanyInvestorSignUp`,
      data
    );
  }

  verifyCompanyInvestorOTP(
    data: CompanyOtpSignUpDto,
    token?: string,
    otpId?: string
  ): Observable<HttpCustomResponse<{}>> {
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/VerifyOTPCompnay`,
      { ...data, otpId },
      { headers: { Authorization: token as string } }
    );
  }

  finalizeCompanyInvestorRegestration(
    data: CompanyFinalizationDto,
    token?: string,
    otpId?: string,
    otp?: string
  ): Observable<HttpCustomResponse<{}>> {
    const body = { ...data };
    delete body.otp;
    delete body.acceptTerms;
    return this.http.post<HttpCustomResponse<{}>>(
      `${environment.apiUrl}/${this.baseUrl}/FinalizeCompanyRegestration`,
      body,
      { params: { otpId: otpId as string, otp: otp as string }, headers: { Authorization: token as string } }
    );
  }
}
