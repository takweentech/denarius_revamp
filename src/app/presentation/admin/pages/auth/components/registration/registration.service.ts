import { Injectable } from '@angular/core';
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

type StepType = 'individual' | 'company';

interface StepControl {
  key: string;
  validators: Validators[];
}

interface Step {
  key: string;
  title: string;
  description: string;
  controls?: StepControl[];
  component?: any;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  steps: Record<StepType, Step[]> = {
    individual: [
      {
        key: 'information',
        title: 'تسجيل حساب مستثمر فرد',
        description: 'قم بتعبئة البيانات الأساسية',
        component: InformationComponent,
      },
      {
        key: 'otp',
        title: 'تسجيل حساب مستثمر فرد',
        description: 'تحقق من رقم الجوال',
        component: OtpComponent,
      },
      {
        key: 'address',
        title: 'العنوان الوطني',
        description: 'معلومات العنوان الوطني',
        component: AddressComponent,
      },
      {
        key: 'financial',
        title: 'المعلومات الشخصية',
        description:
          'تبعاً للمتطلبات التشريعية، يتوجب عليك الإجابة على بعض الأسئلة',
        component: FinancialComponent,
      },
      {
        key: 'investment',
        title: 'المعلومات الاستثمارية',
        description: 'أخبرنا عن معرفتك الاستثمارية',
        component: InvestmentComponent,
      },
      {
        key: 'disclosure',
        title: 'الإفصاحات',
        description: 'يرجى الإجابة على الأسئلة التالية',
        component: DisclosureComponent,
      },
      {
        key: 'absher',
        title: 'التحقق من البيانات',
        description: 'قمنا بإرسال رمز على رقمك المسجل في آبشر',
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
  constructor() {}

  getStepByType(type: StepType): Step[] {
    return this.steps[type];
  }
}
