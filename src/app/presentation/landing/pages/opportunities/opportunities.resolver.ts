import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { OpportunityService } from "../../../../data/opportunity.service";
import { HttpCustomResponse } from "../../../../core/models/http";
import { Opportunity } from "../../../../core/models/opportunity";
import { InvestmentResponse } from "../../../../core/models/investment";
import { InvestmentService } from "../../../../data/investment.service";

export const opportunityResolver: ResolveFn<HttpCustomResponse<Opportunity>> = (route, state) => {
    const opportunityService = inject(OpportunityService);
    return opportunityService.getById(route.params['id'])
};

export const opportunityInvestResolver: ResolveFn<HttpCustomResponse<InvestmentResponse>> = (route, state) => {
    const investmentService = inject(InvestmentService);
    return investmentService.invest(route.params['id'])
};

