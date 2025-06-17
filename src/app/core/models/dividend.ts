export interface Dividend {
    id: number;
    totalPrincipal: number;
    totalDividence: number;
    totalAgencyFee: number;
    totalVat: number;
    net: number;
    status: string;
    maturityDate: string; // ISO 8601 date string
    accountNumber: string;
    opportunityName: string;
}


export interface DividendFilter {
    pageNumber: number,
    pageSize: number,
    filter: {
        opportunityId?: number,
        statusId?: number,
        investorId?: number,
        startDate?: string,
        endDate?: string,
        nameEn?: string,
        nameAr?: string,
        isDeleted?: true
    },
    orderByValue: [
        {
            colId: string,
            sort: string
        }
    ]
}
