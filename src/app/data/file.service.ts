import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FileUploaderResponse } from '../core/models/file';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'Uploader';

  uploadInvestor(file: File): Observable<FileUploaderResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileUploaderResponse>(`${environment.apiUrl}/${this.baseUrl}/Investor/upload`, formData);
  }
}
