import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Investment } from '../../../../../core/models/investment';
import { HttpCustomResponse } from '../../../../../core/models/http';
import { InvestorService } from '../../../../../data/investor.service';

@Injectable({
    providedIn: 'root'
})
export class InvestmentResolver implements Resolve<HttpCustomResponse<Investment>> {
    private readonly investorService = inject(InvestorService);


    resolve(route: ActivatedRouteSnapshot): Observable<HttpCustomResponse<Investment>> {
        return this.investorService.getById(Number(route.paramMap.get('id')));
    }
}
