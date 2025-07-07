import { ResolveFn } from '@angular/router';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const termsResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  const translate = inject(TranslateService);
  const currentLang = translate.currentLang || translate.defaultLang || 'en';

  const url = `/terms-and-condition?locale=${currentLang}&populate=header&populate=terms_content`;

  return strapiService.getContentByPage(url);
};
