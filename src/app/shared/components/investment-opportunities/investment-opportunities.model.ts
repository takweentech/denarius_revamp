export interface InvestmentOpportunity {
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
  dueDate: string;
  startDate: string;
  endDate: string;
  programName: string | null;
  dividends: any[];
}
