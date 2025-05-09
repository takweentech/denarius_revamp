export interface IndividualInitialSignUpDto {
    idNumber: string,
    birhtdate: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string,
    terms: boolean
}

export interface IndividualOtpSignUpDto {
    otp: string,
    otpId: string,
    token?: string
}


export interface IndividualCompletionDto {
    idNumber: string,
    email: string,
    phoneNumber: string,
    password: string,
    sourceIncome: number,
    incomeAmount: number,
    street: string,
    district: number,
    city: string,
    region: string,
    postalCode: string,
    additionalCode: string,
    areaName: string,
    maritalStatus: number,
    familyMembersCount: number,
    educationLevel: number,
    employmentStatus: number,
    jobTitle: number,
    yearsOfExperience: number,
    annualIncome: number,
    netWealth: number,
    riskTolerance: number,
    investmentExperience: number,
    investmentHorizon: number,
    investmentGoal: number,
    isBeneficiary: number,
    beneficiaryIdNumber: number,
    workedInFinancialSector: number,
    isBoardMember: number,
    hasRelationWithBoardMember: number,
    holdsHighPosition: number,
    hasRelativeInHighPosition: number,
    hasUSCitizenship: number
}