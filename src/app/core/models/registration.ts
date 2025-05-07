export interface IndividualInitialSignUpDto {
    idNumber: string,
    birhtdate: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface IndividualOtpSignUpDto {
    otp: string,
    otpId: string
}