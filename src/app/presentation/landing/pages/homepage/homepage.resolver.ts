import { ResolveFn } from "@angular/router";
import { StrapiService } from "../../../../core/strapi/strapi.service";
import { inject } from "@angular/core";

export const homepageResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  return strapiService.getContentByPage(
    "/homepage?populate=hero&populate=hero.media&populate=license&populate=cta&populate=cta.box&populate=cta.image&populate=compliance&populate=compliance.box&populate=faq&populate=faq.point&populate=faq.question&populate=opportunities&populate=partners"
  );
};
