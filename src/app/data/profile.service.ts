import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpCustomResponse } from '../core/models/http';
import { UserProfileData } from '../core/models/user';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'Profile';

    getUserProfile(): Observable<HttpCustomResponse<UserProfileData>> {
        return this.http.get<HttpCustomResponse<UserProfileData>>(`${environment.apiUrl}/${this.baseUrl}/GetMainProfile`)
    }


}
