import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { OpportunityService } from "../../../../data/opportunity.service";
import { HttpCustomResponse } from "../../../../core/models/http";
import { Opportunity } from "../../../../core/models/opportunity";

export const opportunityResolver: ResolveFn<HttpCustomResponse<Opportunity>> = (route, state) => {
    const opportunityService = inject(OpportunityService);
    return opportunityService.getById(route.params['id'])
};
