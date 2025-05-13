import { inject } from '@angular/core';

import { TokenService } from '../services/token.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const tokenService = inject(TokenService);

    const token = tokenService.getToken();
    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(cloned);
    }
    return next(req);
}


