import { Transaction } from './transaction';

export interface User {
  investorId: number;
  name: string;
  emailConfirmed: boolean;
  level: number;
  levelName: string | null;
  type: number;
  typeName: string | null;
  lastRequestUpgradeStatus: any;
  requestUpgradeId: any;
  lastRequestUpgradeStatusName: any;
  idNumber: number;
  gender: number;
  genderName: string;
  bankName: string | null;
  iban: string | null;
  personalIban: string | null;
  ibanbalance: number;
  totalWritingMoney: number;
  totalStocks: number;
  totalWriting: number;
  bankTitle: string | null;
  image: string | null;
  needUpdate: boolean;
  lastUpdateDate: string;
  extraIncomeId: number | null;
  extraIncomeText: string | null;
  isForeign: boolean;
  ibanFund: string | null;
  personalIbanFund: string | null;
  ibanFundBalance: number;
  needUpdateAssets: boolean;
  needUpdateGeneral: boolean;
  commercialRegistryFile: string | null;
  companyPolicy: string | null;
  establishmentContract: string | null;
  shareholdersDecision: string | null;
  resolutionPartners: string | null;
  boardDecision: string | null;
  ibanSukuk: string | null;
  ibanSukukBalance: number;
  totalWritingMoneyFund: number;
  totalStocksFund: number;
  totalWritingFund: number;
  totalWritingMoneySukuk: number;
  totalStocksSukuk: number;
  totalWritingSukuk: number;
  termesCondition: boolean;
  acknowledgement: boolean;
  agreeAccount: boolean;
  locked: boolean;
  email: string | null;
  idExpiryYear: number;
  idExpiryMonth: number;
  idExpiryDay: number;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  employmentStatus: string;
  address: string | null;
  commercialRegistrationNo: string | null;
  endDateYear: number;
  endDateMonth: number;
  endDateDay: number;
  startDateYear: number;
  startDateMonth: number;
  startDateDay: number;
  phoneNumber: string | null;
  id: number;
  isComplete: boolean | null;
  completePercent: number;
}

export interface UserProfileData {
  userProfile: UserProfile;
  investmentAccount: InvestmentAccount;
  financialSummary: FinancialSummary;
  recentTransactions: Transaction[];
  financialDistribution: any;
  investmentPerformance: InvestmentPerformance;
}

export interface UserPersonalData {
  maritalStatus: number;
  familyMembersCount: number;
  educationLevel: number;
  employmentStatus: number;
  jobTitle: number;
  yearsOfExperience: number;
  annualIncome: number;
  netWealth: number;
}

export interface UserWalletData {}

export interface UserInvestmentStatisticsData {
  totalInvestments: number;
  totalProfits: number;
  totalExpectedProfits: number;
  totalDeposits: number;
  totalWithdraws: number;
  totalInvestmentCount: number;
}

export interface UserBasicProfileData {
  fullName: string;
  idNumber: string;
  nationality: string | null;
  mobileNumber: string;
  idExpiryDate: string; // Consider using Date if it's properly formatted
  startingDate: string; // Consider using Date if it's properly formatted
  district: number;
  streetName: string;
  city: string;
  postalCode: string;
  additionalCode: string;
  shortAddress: string;
}

export interface UserBankData {
  bankId: number;
  accountBeneficiaryName: string;
  iban: string;
}

export interface UserInvestmentData {
  riskTolerance: number;
  investmentExperience: number;
  investmentHorizon: number;
  investmentGoal: number;
  isBeneficiary: number;
}

export interface UserProfile {
  fullName: string;
  profileImageUrl: string;
  accountType: string;
  nationalId: string;
  nationality: string | null;
  startDate: string;
  expiryDate: string;
  mobileNumber: string;
}

export interface InvestmentAccount {
  bankName: string;
  accountHolderName: string;
  accountNumber: string | null;
  iban: string | null;
  balance: number;
  openingDate: string;
  expiryDate: string;
}

export interface FinancialSummary {
  totalDeposits: number;
  totalInvestments: number;
  totalProfits: number;
  expectedProfits: number;
}

export interface UserPassword {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

export interface InvestmentPerformance {
  performanceData: any[];
}
