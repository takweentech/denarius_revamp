export interface UpgradeRequest {
  id: number;
  investorId: number;
  tradingActivityProofFilePath: string | null;
  netAssetsProofFilePath: string | null;
  professionalCertificationFilePath: string | null;
  financialExperienceProofFilePath: string | null;
  incomeAndCME1ProofFilePath: string | null;
  requestStatus: number;
  note: string;
  isAdmin: boolean;
  createdDate: string;
  createdById: string | null;
  modifiedDate: string;
  modifiedById: string | null;
  requestComments: any[]; // Adjust if known structure
  requestHistories: any[]; // Adjust if known structure
}

export interface UpgradeRequestPayload {
  id?: number;
  TradingActivityProofFilePath: string;
  NetAssetsProofFilePath: string;
  ProfessionalCertificationFilePath: string;
  FinancialExperienceProofFilePath: string;
  IncomeAndCME1ProofFilePath: string;
  Note: string;
}

export interface UpgradeRequestFilter {
  pageNumber: number;
  pageSize: number;
  filter?: {};
  orderByValue?: [
    {
      colId?: string;
      sort?: string;
    },
  ];
}
