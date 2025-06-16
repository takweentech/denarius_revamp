import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse } from '../core/models/http';
import { UserEmail, UserEmailConfirm, UserPassword, UserPhone, UserPhoneConfirm } from '../core/models/account';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'Accounts';

    changePassword(payload: UserPassword): Observable<HttpCustomResponse<{}>> {
        return this.http.post<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/ChangePassword`, payload)
    }

    changePhone(payload: UserPhone): Observable<HttpCustomResponse<{}>> {
        return this.http.post<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/ChangePhone`, payload)
    }

    changeEmail(payload: UserEmail): Observable<HttpCustomResponse<{ requestId: string }>> {
        return this.http.post<HttpCustomResponse<{ requestId: string }>>(`${environment.apiUrl}/${this.baseUrl}/ChangeEmail`, payload)
    }

    confirmEmail(payload: UserEmailConfirm): Observable<HttpCustomResponse<{}>> {
        return this.http.post<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/VerifyEmailChangeOtp`, {}, { params: { requestId: payload.requestId, otp: payload.otp } })
    }

    confirmPhone(payload: UserPhoneConfirm): Observable<HttpCustomResponse<{}>> {
        return this.http.post<HttpCustomResponse<{}>>(`${environment.apiUrl}/${this.baseUrl}/ConfirmChangePhone`, payload)
    }


}
