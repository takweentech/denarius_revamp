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
import { CompanyInitialSignUpDto, CompanyOtpSignUpDto, IndividualCompletionDto, IndividualFinalizationDto, IndividualInitialSignUpDto, IndividualOtpSignUpDto } from '../../../../../../core/models/registration';
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
        title: 'Register an individual investor account',
        description: 'Fill in the basic information',
        component: InformationComponent,
        apiHandler: (data: IndividualInitialSignUpDto) => this.initialIndividualInvestorSignUp(data),
        controls: [
          {
            key: 'idNumber',
            validators: [Validators.required],
            value: '1234567891'
          },
          {
            key: 'birhtdate',
            validators: [Validators.required, minimumAgeValidator(18)],
            value: new Date()
          },
          {
            key: 'phoneNumber',
            validators: [Validators.required],
            value: '512345678'
          },
          {
            key: 'email',
            validators: [Validators.required, Validators.email],
            value: 'email@email.com'
          },
          {
            key: 'password',
            validators: [Validators.required],
            value: 'QWE47ab3c2@@'
          },
          {
            key: 'confirmPassword',
            validators: [Validators.required],
            value: 'QWE47ab3c2@@'
          },
          {
            key: 'terms',
            validators: [Validators.requiredTrue],
          },
        ]
      },
      {
        key: 'otp',
        title: 'Register an individual investor account',
        description: 'Verify mobile number',
        component: OtpComponent,
        apiHandler: (data: IndividualOtpSignUpDto, token?: string, otpId?: string) => this.verifyIndividualInvestorOTP(data, token, otpId),
        controls: [
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)]
          },
        ],
        resolvedData: {}
      },
      {
        key: 'address',
        title: 'National Address',
        description: 'National Address Information',
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
        ]
      },
      {
        key: 'financial',
        title: 'Financial and social information',
        description:
          'Financial and social information',
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
            validators: [Validators.required]
          },
          {
            key: 'yearsOfExperience',
            validators: [Validators.required]
          },
          {
            key: 'annualIncome',
            validators: [Validators.required]
          },
          {
            key: 'netWealth',
            validators: [Validators.required]
          },
        ]
      },
      {
        key: 'investment',
        title: 'Investment information',
        description: 'Tell us about your investment knowledge',
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
        ]
      },
      {
        key: 'disclosure',
        title: 'Disclosures',
        description: 'Please answer the following questions.',
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
      },
      {
        key: 'absher',
        title: 'Data verification',
        description: 'We have sent a code to your Absher registered number.',
        component: AbsherComponent,
        controls: [
          {
            key: 'otp',
            validators: [Validators.required]
          }
        ],
        apiHandler: (data: IndividualFinalizationDto, token?: string, otpId?: string) => this.finalizeIndividualInvestorRegestration(data, token, otpId),
        nextButtonText: 'Finish Registration'
      },
    ],
    company: [
      {
        key: 'information',
        title: 'Register a company investor account',
        description: 'Fill in the basic information',
        component: CompanyInformation,
        controls: [
          {
            key: 'commercialRegistrationNumber',
            validators: [Validators.required],
            value: '1234567891'

          },
          {
            key: 'authorizedPersonId',
            validators: [Validators.required],
            value: '1234567891'
          },
          {
            key: 'authorizedPersonBirthDate',
            validators: [Validators.required]
          },
          {
            key: 'mobileNumber',
            validators: [Validators.required],
            value: '966512345678'
          },
          {
            key: 'email',
            validators: [Validators.required],
            value: 'email@email.com'

          },
          {
            key: 'password',
            validators: [Validators.required],
            value: 'email@email.com'
          },
          {
            key: 'confirmPassword',
            validators: [Validators.required],
            value: 'email@email.com'
          },
          {
            key: 'acceptTerms',
            validators: [Validators.required],
          },
        ],
        apiHandler: (data: CompanyInitialSignUpDto, token?: string, otpId?: string) => this.initialCompanyInvestorSignUp(data)
      },
      {
        key: 'otp',
        title: 'Register an individual investor account',
        description: 'Verify mobile number',
        component: OtpComponent,
        apiHandler: (data: CompanyOtpSignUpDto, token?: string, otpId?: string) => this.verifyCompanyInvestorOTP(data, token, otpId),
        controls: [
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)]
          },
        ],
        resolvedData: {}
      },
      {
        key: 'business',
        title: 'Business Infromation',
        description: 'Tell us more about your business',
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
        ]
      },
      {
        key: 'absher',
        title: 'التحقق من البيانات',
        description: 'قمنا بإرسال رمز على رقمك المسجل في آبشر',
        component: AbsherComponent,
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
    return this.registrationApiService.initialCompanyInvestorSignUp(data)
  }

  verifyCompanyInvestorOTP(data: CompanyOtpSignUpDto, token?: string, otpId?: string): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.verifyCompanyInvestorOTP(data, token, otpId).pipe(
      tap((response) => {
        const step = this.steps['individual'].find(item => item.key === 'business');
        if (step) {
          step.resolvedData = response.data;
        }
      })
    );
  }







}
