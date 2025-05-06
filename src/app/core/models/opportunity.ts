export interface Opportunity { };
export interface OpportunityFilter {
    pageNumber?: number,
    pageSize?: number,
    filter?: {
        name?: string,
        statusId?: number,
        nameEn?: string,
        nameAr?: string,
        isDeleted?: boolean
    },
    orderByValue?: [
        {
            colId?: string,
            sort?: string
        }
    ]
};