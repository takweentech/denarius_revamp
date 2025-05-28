export interface InvestmentPaymentResponse {
    referenceId: string;
    transactionWritingDate: string; // ISO date string
    status: number;
    statusName: string;
    acknowledge: string;
    method: number;
    methodName: string;
    pioneerName: string;
    stockCount: number;
    issueNo: number;
    transactionAmount: number;
}


export interface Investment {
    id: number;
    name: string;
    amount: number;
    status: string;
    type: string;
    stockCount: number;
    stockValue: number;
    writingDate: string;
}


export interface InvestmentFilter {
    pageNumber: number,
    pageSize: number,
    filter?: {
        statusId?: number,
        investorId?: number,
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