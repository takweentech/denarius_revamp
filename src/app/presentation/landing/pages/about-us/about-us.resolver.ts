import { ResolveFn } from '@angular/router';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const aboutResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  const translate = inject(TranslateService);
  const currentLang = translate.currentLang || translate.defaultLang || 'en';

  const url = `/about?locale=${currentLang}&populate=header&populate=overview&populate=overview.box&populate=values&populate=values.values&populate=values.values.image&populate=risk_notice&populate=compliance&populate=compliance.box&populate[0]=members&populate[1]=members.members&populate[2]=members.members.image&populate[3]=management&populate[4]=management.members&populate[5]=management.members.image&populate[6]=management.structure`;

  return strapiService.getContentByPage(url);
};
