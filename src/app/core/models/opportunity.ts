export interface Opportunity {
    id: number;
    displayName: string;
    displaySummary: string;
    image: string;
    status: string;
    issuanceNumber: number;
    dividendDate: string;
    miniSuccess: number;
    businessSector: number;
    investorMinLimit: number;
    annualReturn: number;
    rri: number;
    roi: number;
    expectedReturn: number;
    stockCount: number;
    stockValue: number;
    durationInMonths: number;
    dueDate: string; // ISO date string
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    programName: string;
    dividends: Dividend[];
    opportunitySections: Section[];
};

interface Dividend {
    id: number
    paymentDate: string
    initialBalance: number
    nominalValue: number
    earn: number
    agencyFee: number
    vat: number
    net: number
    opportunityId: number
}

interface Section {
    id: number,
    title: string,
    description: string,
    isViewable: boolean,
}


export interface OpportunityFilter {
    pageNumber: number,
    pageSize: number,
    filter?: {
        name?: string | null,
        statusId?: number,
        nameEn?: string | null,
        nameAr?: string | null,
        isDeleted?: boolean
    },
    orderByValue?: [
        {
            colId?: string,
            sort?: string
        }
    ]
};