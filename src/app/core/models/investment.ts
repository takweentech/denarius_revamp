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

export interface InvestmentResponse {
  opportunityId: number;
  opportunityStatus: number;
  opportunityStockCount: number;
  opportunityStockValue: number;
  remainingStockCount: number;
  emailConfirmed: boolean;
  investorLevel: number;
  investorLevelName: string;
  investorMinLimitStockCount: number;
  investorMaxLimitStockCount: number;
  investmentLessThanTwoDays: boolean;
  investorWalletAmount: number;
  investorWalletAmountFund: number;
  investorMinLimit: number;
  skey: string | null;
  ckey: string | null;
  ptprofile: string | null;
  applepay: boolean;
  isCardPay: boolean;
  processFees: number;
  targetProfit: number;
  vat: number;
  agencyFee: number;
  netProfit: number;
  documents: any; // Adjust type if you have document structure
  dividends: Dividend[];
  overviewBody: string | null;
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
  pageNumber: number;
  pageSize: number;
  filter?: {
    statusId?: number;
    investorId?: number;
    nameEn?: string;
    nameAr?: string;
    isDeleted?: true;
  };
  orderByValue: [
    {
      colId: string;
      sort: string;
    },
  ];
}

export interface Dividend {
  isLast: boolean;
  sequence: number;
  paymentDate: string; // ISO format
  initialBalance: number;
  nominalValue: number;
  earn: number;
  agencyFee: number;
  vat: number;
  net: number;
  status: string;
  maturityDate: string; // ISO format
  stockValue: number;
  stockPrincipal: number;
  stockDividence: number;
  stockAgencyFee: number;
  stockTaxVat: number;
  stockNet: number;
  opportunityId: number;
  opportunity: any; // or a specific type if you know it
  id: number;
  createdById: string;
  createdDate: string; // ISO format
  modifiedDate: string; // ISO format
  modifiedById: string | null;
  isDeleted: boolean;
  isActive: boolean;
  ipAddress: string | null;
}
