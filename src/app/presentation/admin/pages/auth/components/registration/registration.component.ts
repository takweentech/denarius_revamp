import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RegistrationService } from './registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { TokenService } from '../../../../../../core/services/token.service';
import { ProfileService } from '../../../../../../data/profile.service';
import { InvestorType } from '../../../../../../core/enums/investor.enums';
import { TranslatePipe } from '@ngx-translate/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent extends BaseComponent implements AfterViewInit, OnInit {
  private readonly registrationService = inject(RegistrationService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);
  steps = this.registrationService.getStepByType(this.activatedRoute.snapshot.params['type']);
  tempToken!: string;
  otpId!: string;
  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;
  private stepperInstance!: Stepper;
  currentIndex = signal<number>(1);
  loading = signal<boolean>(false);

  signUpForm!: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.steps.forEach(step => {
      if (step.key === 'otp') {
        (step as any).inputs = {
          onCompleted: () => this.onNext(),
        };
      }
    });
  }

  getStepInputs(item: any): Record<string, any> {
    const inputs = {
      formGroup: this.signUpForm.get(item.key),
      step: item,
      ...(item.inputs || {}), //  dynamically merge any custom step-specific inputs
    };

    return inputs;
  }
  initForm() {
    this.signUpForm = this.fb.group({});
    this.steps.forEach(step => {
      const group = this.fb.group({});
      this.signUpForm.addControl(step.key, group);
      step.controls?.forEach(control => {
        group.addControl(control.key, this.fb.control(control.value ?? null, control.validators ?? []));
      });
      group.setValidators(step.validators || []);
    });
  }

  onNext() {
    const currentStep = this.steps[this.currentIndex() - 1];
    let stepFormVal = this.signUpForm.controls[currentStep.key].value;

    // Collect form values from disclosure
    if (currentStep.key === 'disclosure') {
      stepFormVal = {
        ...this.signUpForm.controls['information'].value,
        ...this.signUpForm.controls['address'].value,
        ...this.signUpForm.controls['financial'].value,
        ...this.signUpForm.controls['investment'].value,
        ...this.signUpForm.controls['disclosure'].value,
      };
    }

    // Collect individual form values for last step
    if (currentStep.key === 'absher' && this.activatedRoute.snapshot.params['type'] === InvestorType.INDIVIDUAL) {
      stepFormVal = {
        ...this.signUpForm.controls[currentStep.key].value,
        ...this.signUpForm.controls['information'].value,
        ...this.signUpForm.controls['address'].value,
        ...this.signUpForm.controls['financial'].value,
        ...this.signUpForm.controls['investment'].value,
        ...this.signUpForm.controls['disclosure'].value,
      };
    }

    // Collect company form values for last step
    if (currentStep.key === 'absher' && this.activatedRoute.snapshot.params['type'] === InvestorType.COMPANY) {
      stepFormVal = {
        ...this.signUpForm.controls[currentStep.key].value,
        ...this.signUpForm.controls['business'].value,
        ...this.signUpForm.controls['information'].value,
      };
    }

    //Check if step isn't valid
    if (this.signUpForm.controls[currentStep.key].invalid) {
      this.signUpForm.controls[currentStep.key].markAllAsTouched();
      return;
    }

    // No api handler case
    if (!currentStep.apiHandler) {
      this.stepperInstance.next();
      this.currentIndex.set(this.currentIndex() + 1);
      return;
    }

    this.loading.set(true);

    currentStep.apiHandler!(stepFormVal, this.tempToken, this.otpId, this.signUpForm.value)
      ?.pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (response: any) => {
          if (response.status !== 200) {
            this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
          } else {
            // Store OTP id and temporary token
            if (currentStep.key === 'information') {
              this.tempToken = response.data['token'];
              this.otpId = response.data['otpId'];
            }

            if (currentStep.key === 'absher') {
              this.tokenService.setToken(response.data);
              this.getUserProfile();
              return;
            }

            //Next
            this.stepperInstance.next();
            this.currentIndex.set(this.currentIndex() + 1);
          }
        },
      });
  }

  onPrev() {
    this.stepperInstance.previous();
    this.currentIndex.set(this.currentIndex() - 1);
  }

  getUserProfile(): void {
    this.profileService
      .getUserProfile()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: response => {
          this.tokenService.setUser(response.data);
          if (history.state['redirectionUrl']) {
            this.router.navigateByUrl(history.state['redirectionUrl']);
          } else {
            this.router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT]);
          }
        },
        error: err => {},
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.stepperRef && !this.stepperInstance) {
        this.stepperInstance = new Stepper(this.stepperRef.nativeElement, {
          linear: false,
          animation: true,
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
