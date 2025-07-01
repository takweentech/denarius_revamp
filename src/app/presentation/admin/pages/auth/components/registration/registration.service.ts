import { inject, Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { InformationComponent } from './components/individual/information/information.component';
import { InformationComponent as CompanyInformation } from './components/company/information/information.component';
import { OtpComponent } from './components/shared/otp/otp.component';
import { AddressComponent } from './components/individual/address/address.component';
import { InvestmentComponent } from './components/individual/investment/investment.component';
import { DisclosureComponent } from './components/individual/disclosure/disclosure.component';
import { FinancialComponent } from './components/individual/financial/financial.component';
import { AbsherComponent } from './components/shared/absher/absher.component';
import { BusinessComponent } from './components/company/business/business.component';
import { RegistrationApiService } from '../../../../../../data/registration.service';
import {
  CompanyFinalizationDto,
  CompanyInitialSignUpDto,
  CompanyOtpSignUpDto,
  IndividualCompletionDto,
  IndividualFinalizationDto,
  IndividualInitialSignUpDto,
  IndividualOtpSignUpDto,
} from '../../../../../../core/models/registration';
import { Observable, tap } from 'rxjs';
import { HttpCustomResponse } from '../../../../../../core/models/http';
import { Step } from './models/registration.model';
import { matchValidator, minimumAgeValidator } from '../../../../../../core/validators/form.validators';
import { REGEX_PATTERNS } from '../../../../../../core/constants/patterns.constants';

type StepType = 'individual' | 'company';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private readonly registrationApiService = inject(RegistrationApiService);
  private steps: Record<StepType, Step<{}>[]> = {
    individual: [
      {
        key: 'information',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INFORMATION.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INFORMATION.DESCRIPTION',
        component: InformationComponent,
        apiHandler: (data: IndividualInitialSignUpDto) => this.initialIndividualInvestorSignUp(data),
        controls: [
          {
            key: 'idNumber',
            validators: [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern('^(1|2)[0-9]{9}$'),
            ],
            // value: '1234567891'
          },
          {
            key: 'birhtdate',
            validators: [Validators.required, minimumAgeValidator(18)],
            // value: new Date()
          },
          {
            key: 'phoneNumber',
            validators: [
              Validators.required,
              Validators.minLength(9),
              Validators.maxLength(9),
              Validators.pattern(REGEX_PATTERNS.PHONE_NUMBER),
            ],
            // value: '512345678'
          },
          {
            key: 'email',
            validators: [Validators.required, Validators.email],
            // value: 'email@email.com'
          },
          {
            key: 'password',
            validators: [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)],
            // value: 'QWE47ab3c2@@'
          },
          {
            key: 'confirmPassword',
            validators: [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)],
            // value: 'QWE47ab3c2@@'
          },
          {
            key: 'terms',
            validators: [Validators.requiredTrue],
          },
        ],
        validators: [matchValidator('password', 'confirmPassword')],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INFORMATION.CTA',
        displayNextButton: true
      },
      {
        key: 'otp',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.OTP.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.OTP.DESCRIPTION',
        component: OtpComponent,
        apiHandler: (data: IndividualOtpSignUpDto, token?: string, otpId?: string) =>
          this.verifyIndividualInvestorOTP(data, token, otpId),
        controls: [
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)],
          },
        ],
        resolvedData: {},
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.OTP.CTA',
        displayNextButton: false
      },
      {
        key: 'address',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ADDRESS.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ADDRESS.DESCRIPTION',
        component: AddressComponent,
        controls: [
          {
            key: 'street',
            validators: [Validators.required],
          },
          {
            key: 'district',
            validators: [Validators.required],
            value: 1,
          },
          {
            key: 'city',
            validators: [Validators.required],
          },
          // {
          //   key: 'region',
          //   validators: [Validators.required]
          // },
          {
            key: 'postalCode',
            validators: [Validators.required],
          },
          {
            key: 'additionalCode',
            validators: [Validators.required],
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ADDRESS.CTA',
        displayNextButton: true
      },
      {
        key: 'financial',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.FINANCIAL.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.FINANCIAL.DESCRIPTION',
        component: FinancialComponent,
        controls: [
          {
            key: 'maritalStatus',
            validators: [Validators.required],
          },
          {
            key: 'familyMembersCount',
            validators: [Validators.required],
          },
          {
            key: 'educationLevel',
            validators: [Validators.required],
          },
          {
            key: 'employmentStatus',
            validators: [Validators.required],
          },
          {
            key: 'jobTitle',
            validators: [Validators.required],
          },
          {
            key: 'yearsOfExperience',
            validators: [Validators.required],
          },
          {
            key: 'annualIncome',
            validators: [Validators.required],
          },
          {
            key: 'netWealth',
            validators: [Validators.required],
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.FINANCIAL.CTA',
        displayNextButton: true
      },
      {
        key: 'investment',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INVESTMENT.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INVESTMENT.DESCRIPTION',
        component: InvestmentComponent,
        controls: [
          {
            key: 'riskTolerance',
            validators: [Validators.required],
          },
          {
            key: 'investmentExperience',
            validators: [Validators.required],
          },
          {
            key: 'investmentHorizon',
            validators: [Validators.required],
          },
          {
            key: 'investmentGoal',
            validators: [Validators.required],
          },
          {
            key: 'isBeneficiary',
            validators: [Validators.required],
          },
          {
            key: 'beneficiaryIdNumber',
            value: 0,
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INVESTMENT.CTA',
        displayNextButton: true
      },
      {
        key: 'disclosure',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.DISCLOSURES.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.DISCLOSURES.DESCRIPTION',
        component: DisclosureComponent,
        controls: [
          {
            key: 'workedInFinancialSector',
            validators: [Validators.required],
          },
          {
            key: 'isBoardMember',
            validators: [Validators.required],
          },
          {
            key: 'hasRelationWithBoardMember',
            validators: [Validators.required],
          },
          {
            key: 'holdsHighPosition',
            validators: [Validators.required],
          },
          {
            key: 'hasRelativeInHighPosition',
            validators: [Validators.required],
          },
          {
            key: 'hasUSCitizenship',
            validators: [Validators.required],
          },
        ],
        apiHandler: (data: IndividualCompletionDto, token?: string, otpId?: string) =>
          this.completeIndividualInvestorRegestration(data, token),
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.DISCLOSURES.CTA',
        displayNextButton: true
      },
      {
        key: 'absher',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ABSHER.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ABSHER.DESCRIPTION',
        component: AbsherComponent,
        controls: [
          {
            key: 'otp',
            validators: [Validators.required],
          },
        ],
        apiHandler: (data: IndividualFinalizationDto, token?: string, otpId?: string) =>
          this.finalizeIndividualInvestorRegestration(data, token, otpId),
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ABSHER.CTA',
        displayNextButton: true
      },
    ],
    company: [
      {
        key: 'information',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.INFORMATION.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.INFORMATION.DESCRIPTION',
        component: CompanyInformation,
        controls: [
          {
            key: 'authorizedPersonId',
            validators: [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern('^(1|2)[0-9]{9}$'),
            ],
            // value: '1234567891'
          },

          {
            key: 'mobileNumber',
            validators: [
              Validators.required,
              Validators.minLength(9),
              Validators.maxLength(9),
              Validators.pattern(REGEX_PATTERNS.PHONE_NUMBER),
            ],
            // value: '512345678'
          },
          {
            key: 'commercialRegistrationNumber',
            validators: [Validators.required],
          },
          {
            key: 'authorizedPersonId',
            validators: [Validators.required],
          },
          {
            key: 'authorizedPersonBirthDate',
            validators: [Validators.required],
          },
          {
            key: 'mobileNumber',
            validators: [Validators.required],
          },
          {
            key: 'email',
            validators: [Validators.required, Validators.email],
          },
          {
            key: 'password',
            validators: [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)],
          },
          {
            key: 'confirmPassword',
            validators: [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)],
          },
          {
            key: 'acceptTerms',
            validators: [Validators.required],
          },
        ],
        validators: [matchValidator('password', 'confirmPassword')],
        apiHandler: (data: CompanyInitialSignUpDto, token?: string, otpId?: string) =>
          this.initialCompanyInvestorSignUp(data),
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.INFORMATION.CTA',
        displayNextButton: true
      },
      {
        key: 'otp',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.OTP.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.OTP.DESCRIPTION',
        component: OtpComponent,
        apiHandler: (data: CompanyOtpSignUpDto, token?: string, otpId?: string) =>
          this.verifyCompanyInvestorOTP(data, token, otpId),
        controls: [
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)],
          },
        ],
        resolvedData: {},
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.INFORMATION.CTA',
        displayNextButton: false
      },
      {
        key: 'business',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.BUSINESS.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.BUSINESS.DESCRIPTION',
        component: BusinessComponent,
        controls: [
          {
            key: 'annualRevenue',
            validators: [Validators.required],
          },
          {
            key: 'employeeCount',
            validators: [Validators.required],
          },
          {
            key: 'investmentExperience',
            validators: [Validators.required],
          },
          {
            key: 'riskTolerance',
            validators: [Validators.required],
          },
          {
            key: 'establishmentContract',
            validators: [Validators.required],
          },
        ],
        resolvedData: {},
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.BUSINESS.CTA',
        displayNextButton: true
      },
      {
        key: 'absher',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.ABSHER.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.ABSHER.DESCRIPTION',
        apiHandler: (data: CompanyFinalizationDto, token?: string, otpId?: string) =>
          this.finalizeCompanyInvestorRegestration(data, token, otpId),
        component: AbsherComponent,
        controls: [
          {
            key: 'otp',
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.ABSHER.CTA',
        displayNextButton: true
      },
    ],
  };
  constructor() { }

  getStepByType(type: StepType): Step<{}>[] {
    return this.steps[type];
  }

  // Individual handlers
  initialIndividualInvestorSignUp(data: IndividualInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.initialIndividualInvestorSignUp({
      ...data,
      phoneNumber: data.phoneNumber,
    });
  }

  verifyIndividualInvestorOTP(
    data: IndividualOtpSignUpDto,
    token?: string,
    otpId?: string
  ): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.verifyIndividualInvestorOTP(data, token, otpId).pipe(
      tap(response => {
        const step = this.steps['individual'].find(item => item.key === 'address');
        if (step) {
          step.resolvedData = response.data;
        }
      })
    );
  }

  completeIndividualInvestorRegestration(data: IndividualCompletionDto, token?: string) {
    return this.registrationApiService.completeIndividualInvestorRegestration(data, token);
  }

  finalizeIndividualInvestorRegestration(data: IndividualFinalizationDto, token?: string, otpId?: string) {
    return this.registrationApiService.finalizeIndividualInvestorRegestration(data, token, otpId, data.otp);
  }

  // Company handlers
  initialCompanyInvestorSignUp(data: CompanyInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.initialCompanyInvestorSignUp({
      ...data,
      mobileNumber: data.mobileNumber,
    });
  }

  verifyCompanyInvestorOTP(
    data: CompanyOtpSignUpDto,
    token?: string,
    otpId?: string
  ): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.verifyCompanyInvestorOTP(data, token, otpId).pipe(
      tap(response => {
        const step = this.steps['company'].find(item => item.key === 'business');
        if (step) {
          step.resolvedData = response.data;
        }
      })
    );
  }

  finalizeCompanyInvestorRegestration(data: CompanyFinalizationDto, token?: string, otpId?: string) {
    return this.registrationApiService.finalizeCompanyInvestorRegestration(data, token, otpId, data.otp);
  }
}
