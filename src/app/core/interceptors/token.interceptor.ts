import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TranslationService } from '../services/translation.service';

const EXCLUDED_URLS = [
    environment.cmsUrl,
    // '/Accounts/',
    '/public/'
];

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenService);
    const translationService = inject(TranslationService);

    // Check if the request URL matches any excluded route
    const shouldExclude = EXCLUDED_URLS.some(url => req.url.includes(url));
    if (shouldExclude) {
        return next(req);
    }

    const token = tokenService.getToken();
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`).set('Accept-Language', translationService.language)
        });
        return next(cloned);
    }

    return next(req);
};
