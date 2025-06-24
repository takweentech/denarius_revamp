import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private readonly http = inject(HttpClient);

  get(url: string, lang?: string) {
    return this.http.get(environment.cmsUrl + url).pipe(map((data: any) => data.data));
  }

  getContentByPage(pageName: string, lang?: string) {
    return this.http.get(environment.cmsUrl + pageName).pipe(map((data: any) => data.data));
  }
}
