import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Lookup } from '../models/lookup';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'Lookup';

  getJobTitle(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/JopTitles`);
  }

  getNetWorth(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/GetNetWorth`);
  }

  getAnnualIncome(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/GetAnnualIncome`);
  }

  getEducationLevel(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/EducationLevel`);
  }

  getEmploymentStatus(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/EmploymentStatus`);
  }

  getMartialStatus(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/MaritalStatus`);
  }

  getBanks(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/GetAllBanks`);
  }

  getRiskTolerance(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/RiskTolerance`);
  }
  getInvestmentExperience(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/InvestmentExperienceLookup`);
  }
  getInvestmentDuration(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/InvestmentDuration`);
  }
  getInvestmentGoal(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${environment.apiUrl}/${this.baseUrl}/InvestmentGoal`);
  }

  getDividendStatus(): Lookup[] {
    return [
      { active: true, englishName: 'DIVIDENDS.FILTER.ALL', arabicName: 'DIVIDENDS.FILTER.ALL', value: 0 },
      { englishName: 'DIVIDENDS.FILTER.DISTRIBUTED', arabicName: 'DIVIDENDS.FILTER.DISTRIBUTED', value: 1 },
      { englishName: 'DIVIDENDS.FILTER.PENDING', arabicName: 'DIVIDENDS.FILTER.PENDING', value: 2 },
      { englishName: 'DIVIDENDS.FILTER.DELAYED', arabicName: 'DIVIDENDS.FILTER.DELAYED', value: 3 },
    ];
  }

  getMartialStatusList() {
    return [
      { englishName: 'Divorced', arabicName: 'مطلق', value: 1 },
      { englishName: 'Married', arabicName: 'متزوج', value: 2 },
      { englishName: 'Widower', arabicName: 'أرمل', value: 3 },
      { englishName: 'Single', arabicName: 'أعزب', value: 4 },
    ];
  }

  getEducationLevelList() {
    return [
      { englishName: 'University Degree', arabicName: 'درجة جامعية', value: 1 },
      { englishName: 'High School Diploma', arabicName: 'دبلوم المدرسة الثانوية', value: 2 },
      { englishName: 'Primary School', arabicName: 'المدرسة الابتدائية', value: 3 },
      { englishName: 'No Formal Education', arabicName: 'بدون تعليم رسمي', value: 4 },
    ];
  }

  getEmploymentStatusList() {
    return [
      { englishName: 'Employed', arabicName: 'موظف', value: 1 },
      { englishName: 'Unemployed', arabicName: 'عاطل عن العمل', value: 2 },
      { englishName: 'Student', arabicName: 'طالب', value: 3 },
      { englishName: 'Retired', arabicName: 'متقاعد', value: 4 },
    ];
  }

  getAnnualIncomeList() {
    return [
      { englishName: 'Less than 50,000 SAR', arabicName: 'أقل من 50,000 ريال سعودي', value: 1 },
      { englishName: '50,000 – 100,000 SAR', arabicName: '50,000 – 100,000 ريال سعودي', value: 2 },
      { englishName: '100,001 – 200,000 SAR', arabicName: '100,001 – 200,000 ريال سعودي', value: 3 },
      { englishName: 'More than 200,000 SAR', arabicName: 'أكثر من 200,000 ريال سعودي', value: 4 },
    ];
  }

  getEstimatedNetWorthList() {
    return [
      { englishName: 'Less than 500,000 SAR', arabicName: 'أقل من 500,000 ريال سعودي', value: 1 },
      { englishName: '500,000 – 1,000,000 SAR', arabicName: '500,000 – 1,000,000 ريال سعودي', value: 2 },
      { englishName: '1,000,001 – 5,000,000 SAR', arabicName: '1,000,001 – 5,000,000 ريال سعودي', value: 3 },
      { englishName: 'More than 5,000,000 SAR', arabicName: 'أكثر من 5,000,000 ريال سعودي', value: 4 },
    ];
  }

  getInvestmentExperienceList() {
    return [
      { englishName: 'Low', arabicName: 'منخفضة', value: 1 },
      { englishName: 'Medium', arabicName: 'متوسطة', value: 2 },
      { englishName: 'High', arabicName: 'مرتفعة', value: 3 },
    ];
  }

  getRiskToleranceList() {
    return [
      { englishName: 'Low', arabicName: 'منخفضة', value: 1 },
      { englishName: 'Medium', arabicName: 'متوسطة', value: 2 },
      { englishName: 'High', arabicName: 'مرتفعة', value: 3 },
    ];
  }

  getInvestmentPeriodList() {
    return [
      { englishName: 'Less than 1 year', arabicName: 'أقل من سنة', value: 1 },
      { englishName: '1 – 3 years', arabicName: 'من 1 إلى 3 سنوات', value: 2 },
      { englishName: '3 – 5 years', arabicName: 'من 3 إلى 5 سنوات', value: 3 },
      { englishName: 'More than 5 years', arabicName: 'أكثر من 5 سنوات', value: 4 },
    ];
  }

  getInvestmentObjectivesList() {
    return [
      { englishName: 'Capital Preservation', arabicName: 'حفظ رأس المال', value: 1 },
      { englishName: 'Income Generation', arabicName: 'توليد الدخل', value: 2 },
      { englishName: 'Capital Growth', arabicName: 'نمو رأس المال', value: 3 },
      { englishName: 'Speculation / High Return', arabicName: 'المضاربة / عائد مرتفع', value: 4 },
    ];
  }

  getYesNoOptions() {
    return [
      { englishName: 'Yes', arabicName: 'نعم', value: 0 },
      { englishName: 'No', arabicName: 'لا', value: 1 },
    ];
  }
}
