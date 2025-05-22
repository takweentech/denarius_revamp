import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { CompanyFinalizationDto, CompanyInitialSignUpDto, CompanyOtpSignUpDto, IndividualCompletionDto, IndividualFinalizationDto, IndividualInitialSignUpDto, IndividualOtpSignUpDto } from '../../../../../../core/models/registration';
import { Observable, tap } from 'rxjs';
import { HttpCustomResponse } from '../../../../../../core/models/http';
import { Step } from './models/registration.model';

type StepType = 'individual' | 'company';

function minimumAgeValidator(minAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the birthday hasn’t occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= minAge ? null : { minimumAge: { requiredAge: minAge, actualAge: age } };
  };
}


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
            validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')],
            // value: '1234567891'
          },
          {
            key: 'birhtdate',
            validators: [Validators.required, minimumAgeValidator(18)],
            // value: new Date()
          },
          {
            key: 'phoneNumber',
            validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')],
            // value: '512345678'
          },
          {
            key: 'email',
            validators: [Validators.required, Validators.email],
            // value: 'email@email.com'
          },
          {
            key: 'password',
            validators: [Validators.required],
            // value: 'QWE47ab3c2@@'
          },
          {
            key: 'confirmPassword',
            validators: [Validators.required],
            // value: 'QWE47ab3c2@@'
          },
          {
            key: 'terms',
            validators: [Validators.requiredTrue],
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INFORMATION.CTA'
      },
      {
        key: 'otp',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.OTP.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.OTP.DESCRIPTION',
        component: OtpComponent,
        apiHandler: (data: IndividualOtpSignUpDto, token?: string, otpId?: string) => this.verifyIndividualInvestorOTP(data, token, otpId),
        controls: [
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)]
          },
        ],
        resolvedData: {},
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.OTP.CTA'

      },
      {
        key: 'address',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ADDRESS.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ADDRESS.DESCRIPTION',
        component: AddressComponent,
        controls: [
          {
            key: 'street',
            validators: [Validators.required]
          },
          {
            key: 'district',
            validators: [Validators.required],
            value: 1
          },
          {
            key: 'city',
            validators: [Validators.required]
          },
          // {
          //   key: 'region',
          //   validators: [Validators.required]
          // },
          {
            key: 'postalCode',
            validators: [Validators.required]
          },
          {
            key: 'additionalCode',
            validators: [Validators.required]
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ADDRESS.CTA'

      },
      {
        key: 'financial',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.FINANCIAL.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.FINANCIAL.DESCRIPTION',
        component: FinancialComponent,
        controls: [
          {
            key: 'maritalStatus',
            validators: [Validators.required]
          },
          {
            key: 'familyMembersCount',
            validators: [Validators.required]
          },
          {
            key: 'educationLevel',
            validators: [Validators.required]
          },
          {
            key: 'employmentStatus',
            validators: [Validators.required]
          },
          {
            key: 'jobTitle',
            value: ""
          },
          {
            key: 'yearsOfExperience',
            value: ""
          },
          {
            key: 'annualIncome',
            validators: [Validators.required]
          },
          {
            key: 'netWealth',
            validators: [Validators.required]
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.FINANCIAL.CTA'
      },
      {
        key: 'investment',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INVESTMENT.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INVESTMENT.DESCRIPTION',
        component: InvestmentComponent,
        controls: [
          {
            key: 'riskTolerance',
            validators: [Validators.required]
          },
          {
            key: 'investmentExperience',
            validators: [Validators.required]
          },
          {
            key: 'investmentHorizon',
            validators: [Validators.required]
          },
          {
            key: 'investmentGoal',
            validators: [Validators.required]
          },
          {
            key: 'isBeneficiary',
            validators: [Validators.required]
          },
          {
            key: 'beneficiaryIdNumber',
            value: 0
          },
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.INVESTMENT.CTA'
      },
      {
        key: 'disclosure',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.DISCLOSURES.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.DISCLOSURES.DESCRIPTION',
        component: DisclosureComponent,
        controls: [
          {
            key: 'workedInFinancialSector',
            validators: [Validators.required]

          },
          {
            key: 'isBoardMember',
            validators: [Validators.required]

          },
          {
            key: 'hasRelationWithBoardMember',
            validators: [Validators.required]

          },
          {
            key: 'holdsHighPosition',
            validators: [Validators.required]

          },
          {
            key: 'hasRelativeInHighPosition',
            validators: [Validators.required]

          },
          {
            key: 'hasUSCitizenship',
            validators: [Validators.required]

          },
        ],
        apiHandler: (data: IndividualCompletionDto, token?: string, otpId?: string) => this.completeIndividualInvestorRegestration(data, token),
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.DISCLOSURES.CTA'
      },
      {
        key: 'absher',
        title: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ABSHER.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ABSHER.DESCRIPTION',
        component: AbsherComponent,
        controls: [
          {
            key: 'otp',
            validators: [Validators.required]
          }
        ],
        apiHandler: (data: IndividualFinalizationDto, token?: string, otpId?: string) => this.finalizeIndividualInvestorRegestration(data, token, otpId),
        nextButtonText: 'AUTHENTICATION.REGISTRATION.INDIVIDUAL.ABSHER.CTA'
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
            key: 'commercialRegistrationNumber',
            validators: [Validators.required],
          },
          {
            key: 'authorizedPersonId',
            validators: [Validators.required],
          },
          {
            key: 'authorizedPersonBirthDate',
            validators: [Validators.required]
          },
          {
            key: 'mobileNumber',
            validators: [Validators.required],
          },
          {
            key: 'email',
            validators: [Validators.required],
          },
          {
            key: 'password',
            validators: [Validators.required],
          },
          {
            key: 'confirmPassword',
            validators: [Validators.required],
          },
          {
            key: 'acceptTerms',
            validators: [Validators.required],
          },
        ],
        apiHandler: (data: CompanyInitialSignUpDto, token?: string, otpId?: string) => this.initialCompanyInvestorSignUp(data),
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.INFORMATION.CTA'
      },
      {
        key: 'otp',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.OTP.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.OTP.DESCRIPTION',
        component: OtpComponent,
        apiHandler: (data: CompanyOtpSignUpDto, token?: string, otpId?: string) => this.verifyCompanyInvestorOTP(data, token, otpId),
        controls: [
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)]
          },
        ],
        resolvedData: {},
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.INFORMATION.CTA'
      },
      {
        key: 'business',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.BUSINESS.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.BUSINESS.DESCRIPTION',
        component: BusinessComponent,
        controls: [
          {
            key: 'annualRevenue',
            validators: [Validators.required]
          },
          {
            key: 'employeeCount',
            validators: [Validators.required]
          },
          {
            key: 'investmentExperience',
            validators: [Validators.required]
          },
          {
            key: 'riskTolerance',
            validators: [Validators.required]
          },
          {
            key: 'establishmentContract',
            validators: [Validators.required],
          },
        ],
        resolvedData: {},
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.BUSINESS.CTA'


      },
      {
        key: 'absher',
        title: 'AUTHENTICATION.REGISTRATION.COMPANY.ABSHER.TITLE',
        description: 'AUTHENTICATION.REGISTRATION.COMPANY.ABSHER.DESCRIPTION',
        apiHandler: (data: CompanyFinalizationDto, token?: string, otpId?: string) => this.finalizeCompanyInvestorRegestration(data, token, otpId),
        component: AbsherComponent,
        controls: [
          {
            key: 'otp',
            validators: [Validators.required]
          }
        ],
        nextButtonText: 'AUTHENTICATION.REGISTRATION.COMPANY.ABSHER.CTA'

      },
    ],
  };
  constructor() { }

  getStepByType(type: StepType): Step<{}>[] {
    return this.steps[type];
  }

  // Individual handlers
  initialIndividualInvestorSignUp(data: IndividualInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.initialIndividualInvestorSignUp({ ...data, phoneNumber: '966' + data.phoneNumber })
  }

  verifyIndividualInvestorOTP(data: IndividualOtpSignUpDto, token?: string, otpId?: string): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.verifyIndividualInvestorOTP(data, token, otpId).pipe(
      tap((response) => {
        const step = this.steps['individual'].find(item => item.key === 'address');
        if (step) {
          step.resolvedData = response.data;
        }
      })
    );
  }

  completeIndividualInvestorRegestration(data: IndividualCompletionDto, token?: string) {
    return this.registrationApiService.completeIndividualInvestorRegestration(data, token)
  }


  finalizeIndividualInvestorRegestration(data: IndividualFinalizationDto, token?: string, otpId?: string) {
    return this.registrationApiService.finalizeIndividualInvestorRegestration(data, token, otpId, data.otp)
  }


  // Company handlers
  initialCompanyInvestorSignUp(data: CompanyInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.initialCompanyInvestorSignUp({ ...data, mobileNumber: '966' + data.mobileNumber })
  }

  verifyCompanyInvestorOTP(data: CompanyOtpSignUpDto, token?: string, otpId?: string): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.verifyCompanyInvestorOTP(data, token, otpId).pipe(
      tap((response) => {
        const step = this.steps['company'].find(item => item.key === 'business');
        if (step) {
          step.resolvedData = response.data;
        }
      })
    );
  }


  finalizeCompanyInvestorRegestration(data: CompanyFinalizationDto, token?: string, otpId?: string) {
    return this.registrationApiService.finalizeCompanyInvestorRegestration(data, token, otpId, data.otp)
  }







}
