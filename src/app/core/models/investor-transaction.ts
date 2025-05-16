export interface InvestorTransactionFilter {
  statusId: number;
  investorId: number;
  paymentMethod: number;
  startDate: string;
  endDate: string;
  nameEn: string;
  nameAr: string;
  isDeleted: boolean;
}

export interface OrderBy {
  colId: string;
  sort: "asc" | "desc";
}

export interface InvestorTransactionsPagedRequest {
  pageNumber: number;
  pageSize: number;
  filter: InvestorTransactionFilter;
  orderByValue: OrderBy[];
}
