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
export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  pages: number[];
}

export interface InvestorTransaction {
  id: number;
  description: string | null;
  refId: string;
  transactionType: string;
  amount: number;
  accountNumber: string | null;
  createDate: string;
  transactionMethod: string;
  transactionStatus: string;
}

export interface InvestorTransactionsPagedResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: InvestorTransaction[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  exception?: any;
}
