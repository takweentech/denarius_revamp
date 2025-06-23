export interface UserPassword {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

export interface UserEmail {
  email: string;
}

export interface UserPhone {
  newPhoneNumber: string;
}

export interface UserPhoneConfirm {
  newPhoneNumber: string;
  otp: string;
}

export interface UserEmailConfirm {
  requestId: string;
  otp: string;
}
