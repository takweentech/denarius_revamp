import { inject, Injectable } from '@angular/core';
import { AppConfig } from '../models/config';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly http = inject(HttpClient);
  private config!: AppConfig;

  loadConfig() {
    return this.http.get(environment.cmsUrl + '/config?populate=*').pipe(
      tap((data: any) => {
        this.config = {
          name: data.data.name,
          logoPath: data.data.logo.url,
          logoLight: data.data.logoLight.url,
          logoDark: data.data.logoDark.url,
          theme: {
            primaryColor: data.data.primaryColor,
            secondaryColor: data.data.secondaryColor,
            dangerColor: data.data.dangerColor,
            successColor: data.data.successColor,
          },
        }
        this.setAppTheme();
        this.setAppName()
      })
    )
  }

  getConfig(): AppConfig {
    return this.config;
  }


  private setAppName(): void {
    document.title = this.config.name
  }

  private setAppTheme(): void {
    document.documentElement.style.setProperty('--primary-color', this.config.theme.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', this.config.theme.secondaryColor)
    document.documentElement.style.setProperty('--danger-color', this.config.theme.dangerColor)
    document.documentElement.style.setProperty('--success-color', this.config.theme.successColor)
  }

}
