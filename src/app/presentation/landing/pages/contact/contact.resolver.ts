import { ResolveFn } from '@angular/router';
import { TranslationService } from '../../../../core/services/translation.service';
import { StrapiService } from '../../../../core/strapi/strapi.service';
import { inject } from '@angular/core';

export const contactResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  const translationService = inject(TranslationService);

  return strapiService.getContentByPage(
    '/contact?locale=' +
      translationService.language +
      '&populate=address&populate=contact_details&populate=contact_us&populate=location'
  );
};
