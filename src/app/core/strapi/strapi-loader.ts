import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';

export class StrapiTranslateLoader implements TranslateLoader {
    private readonly http = inject(HttpClient);

    getTranslation(lang: string): Observable<any> {
        const url = `${environment.cmsUrl}/content?locale=${lang}`;
        return this.http.get<any>(url, { headers: { 'Authorization': '' } }).pipe(
            map(response => {
                return response.data.CONTENT;
            })
        );
    }
}
