import { ResolveFn } from '@angular/router';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const servicesResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  const translate = inject(TranslateService);
  const currentLang = translate.currentLang || translate.defaultLang || 'en';

  const url = `/service?locale=${currentLang}&populate=intro&populate=header&populate=intro.box&populate=listing&populate=listing.card&populate=listing.card.image&populate=contact`;
  return strapiService.getContentByPage(url);
};
