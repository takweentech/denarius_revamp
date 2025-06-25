import { ResolveFn } from '@angular/router';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const homepageResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  const translate = inject(TranslateService);
  const currentLang = translate.currentLang || translate.defaultLang || 'en';

  const url = `/homepage?locale=${currentLang}&populate=hero&populate=hero.media&populate=license&populate=cta&populate=cta.box&populate=cta.image&populate=compliance&populate=compliance.box&populate=faq&populate=faq.point&populate=faq.question&populate=opportunities&populate=partners`;

  return strapiService.getContentByPage(url);
};
