import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TranslationService } from '../services/translation.service';

const EXCLUDED_URLS = [
  environment.cmsUrl,
  // '/Accounts/',
  '/public/',
];

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenService = inject(TokenService);
  const translationService = inject(TranslationService);

  const shouldExclude = EXCLUDED_URLS.some(url => req.url.includes(url));
  if (shouldExclude) {
    return next(req);
  }

  const token = tokenService.getToken();
  let headers = req.headers.set('Accept-Language', translationService.language);

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const cloned = req.clone({ headers });
  return next(cloned);
};
