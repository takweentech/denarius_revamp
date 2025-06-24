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
  sort: 'asc' | 'desc';
}

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  pages: number[];
}

export interface Transaction {
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

export interface TransactionFilter {
  pageNumber: number;
  pageSize: number;
  filter?: {
    statusId?: number;
    investorId?: number;
    paymentMethod?: number;
    startDate?: string;
    endDate?: string;
    nameEn?: string;
    nameAr?: string;
    isDeleted?: boolean;
  };
  orderByValue?: [
    {
      colId?: string;
      sort?: string;
    },
  ];
}
