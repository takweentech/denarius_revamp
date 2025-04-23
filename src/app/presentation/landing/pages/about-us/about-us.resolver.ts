import { ResolveFn } from "@angular/router";
import { StrapiService } from "../../../../core/strapi/strapi.service";
import { inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export const aboutResolver: ResolveFn<boolean> = (route, state) => {
  const strapiService = inject(StrapiService);
  const translate = inject(TranslateService);
  const currentLang = translate.currentLang || translate.defaultLang || "en";

  const url = `/about?locale=${currentLang}&populate=header&populate=overview&populate=overview.box&populate=values.item&populate=members.member&populate=members&populate=management&populate=management.member&populate=management.structure&populate=risk_notice&populate=compliance&populate=compliance.box`;

  return strapiService.getContentByPage(url);
};
