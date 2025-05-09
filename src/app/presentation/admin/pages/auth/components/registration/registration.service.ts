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
import { IndividualCompletionDto, IndividualInitialSignUpDto, IndividualOtpSignUpDto } from '../../../../../../core/models/registration';
import { Observable, of, tap } from 'rxjs';
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
            value: '966512345678'
          },
          {
            key: 'email',
            validators: [Validators.required, Validators.email],
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
        apiHandler: (data: IndividualOtpSignUpDto) => this.verifyIndividualInvestorOTP(data),
        controls: [
          {
            key: 'token',
          },
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)]
          },
          {
            key: 'otpId',
          }
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
            validators: [Validators.required]
          },
          {
            key: 'city',
            validators: [Validators.required]
          },
          {
            key: 'region',
            validators: [Validators.required]
          },
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
            validators: [Validators.required]
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
        apiHandler: (data: IndividualCompletionDto) => this.completeIndividualInvestorRegestration(data),
      },
      {
        key: 'absher',
        title: 'Data verification',
        description: 'We have sent a code to your Absher registered number.',
        component: AbsherComponent,
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
          },
          {
            key: 'authorizedPersonId',
          },
          {
            key: 'authorizedPersonBirthDate',
          },
          {
            key: 'mobileNumber',
          },
          {
            key: 'email',
          },
          {
            key: 'password',
          },
          {
            key: 'confirmPassword',
          },
          {
            key: 'acceptTerms',
          },
        ]
      },
      {
        key: 'otp',
        title: 'Register an individual investor account',
        description: 'Verify mobile number',
        component: OtpComponent,
        controls: [
          {
            key: 'token',
          },
          {
            key: 'otp',
            validators: [Validators.required, Validators.minLength(4)]
          },
          {
            key: 'otpId',
          }
        ],
      },
      {
        key: 'business',
        title: 'مرحباً شركة تكوين تك',
        description: 'معلومات الشركة والشخص المفوض',
        component: BusinessComponent,
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

  initialIndividualInvestorSignUp(data: IndividualInitialSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.initialIndividualInvestorSignUp(data)
  }

  verifyIndividualInvestorOTP(data: IndividualOtpSignUpDto): Observable<HttpCustomResponse<{}>> {
    return this.registrationApiService.verifyIndividualInvestorOTP({ otp: data.otp, otpId: data.otpId }, data.token).pipe(
      tap((response) => {
        const step = this.steps['individual'].find(item => item.key === 'address');
        if (step) {
          step.resolvedData = response.data;
        }
      })
    );
  }

  completeIndividualInvestorRegestration(data: IndividualCompletionDto) {
    return this.registrationApiService.completeIndividualInvestorRegestration(data)
  }







}
