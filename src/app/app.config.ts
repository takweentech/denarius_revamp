import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ConfigService } from './core/services/config.service';
import { StrapiTranslateLoader } from './core/strapi/strapi-loader';
import { authInterceptor } from './core/interceptors/token.interceptor';


export function httpLoaderFactory() {
  return new StrapiTranslateLoader();
}

function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: "enabled",
    })),
    provideHttpClient(withInterceptors([authInterceptor])),

    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })])]
};
