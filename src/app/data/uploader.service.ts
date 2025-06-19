import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploaderService {
  private baseUrl = `${environment.apiUrl}/Uploader`;

  constructor(private http: HttpClient) {}

  /**
   * Upload image for Investor profile
   */
  uploadInvestorImage(file: File): Observable<{ fileName: string }> {
    return this.uploadTo(`${this.baseUrl}/Investor/upload`, file);
  }

  /**
   * Upload image for Pioneer profile
   */
  uploadPioneerImage(file: File): Observable<{ fileName: string }> {
    return this.uploadTo(`${this.baseUrl}/Pioneer/upload`, file);
  }

  /**
   * Upload image for Opportunity
   */
  uploadOpportunityImage(file: File): Observable<{ fileName: string }> {
    return this.uploadTo(`${this.baseUrl}/Opportunity/upload`, file);
  }

  /**
   * Reusable upload logic
   */
  private uploadTo(url: string, file: File): Observable<{ fileName: string }> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<{ fileName: string }>(url, formData);
  }
}
