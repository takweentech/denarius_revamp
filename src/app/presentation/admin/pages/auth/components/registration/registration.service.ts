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
import { IndividualInitialSignUpDto, IndividualOtpSignUpDto } from '../../../../../../core/models/registration';
import { Observable, of, tap } from 'rxjs';
import { HttpCustomResponse } from '../../../../../../core/models/http';
import { Step } from './models/registration.model';

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
            validators: [Validators.required],
            value: new Date()
          },
          {
            key: 'phoneNumber',
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
      },
      {
        key: 'financial',
        title: 'Financial and social information',
        description:
          'Financial and social information',
        component: FinancialComponent,
      },
      {
        key: 'investment',
        title: 'Investment information',
        description: 'Tell us about your investment knowledge',
        component: InvestmentComponent,
      },
      {
        key: 'disclosure',
        title: 'Disclosures',
        description: 'Please answer the following questions.',
        component: DisclosureComponent,
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
        title: 'تسجيل حساب مستثمر شركة',
        description: 'قم بتعبئة البيانات الأساسية',
        component: CompanyInformation,
      },
      {
        key: 'otp',
        title: 'تسجيل حساب مستثمر فرد',
        description: 'تحقق من رقم الجوال',
        component: OtpComponent,
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







}
