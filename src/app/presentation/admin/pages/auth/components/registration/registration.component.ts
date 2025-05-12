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

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BaseComponent implements AfterViewInit, OnInit {
  private readonly registrationService = inject(RegistrationService);
  private readonly activatedRoute = inject(ActivatedRoute);
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
  }

  initForm() {
    this.signUpForm = this.fb.group({});
    this.steps.forEach((step) => {
      const group = this.fb.group({});
      this.signUpForm.addControl(step.key, group);
      step.controls?.forEach((control) => {
        group.addControl(control.key, this.fb.control(control.value ?? null, control.validators ?? []));
      });
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
      }
    }

    // Collect form values from absher
    if (currentStep.key === 'absher') {
      stepFormVal = {
        ...this.signUpForm.controls[currentStep.key].value,
        ...this.signUpForm.controls['information'].value,
        ...this.signUpForm.controls['address'].value,
        ...this.signUpForm.controls['financial'].value,
        ...this.signUpForm.controls['investment'].value,
        ...this.signUpForm.controls['disclosure'].value,
      }
    }


    //Check if step isn't valid
    if (this.signUpForm.controls[currentStep.key].invalid) {
      this.signUpForm.controls[currentStep.key].markAllAsTouched();
      return
    }

    // No api handler case
    if (!currentStep.apiHandler) {
      this.stepperInstance.next();
      this.currentIndex.set(this.currentIndex() + 1);
      return
    }

    this.loading.set(true);

    currentStep.apiHandler!(stepFormVal, this.tempToken, this.otpId, this.signUpForm.value)?.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response: any) => {
        if (response.status !== 200) {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
        } else {
          // Store OTP id and temporary token
          if (currentStep.key === 'information') {
            this.tempToken = response.data['token'];
            this.otpId = response.data['otpId'];
          }

          //Next
          this.stepperInstance.next();
          this.currentIndex.set(this.currentIndex() + 1);


          // Authenticate user 
          if (currentStep.key === 'absher') {
            this.router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT])
          }


        }
      }
    })

  }


  onPrev() {
    this.stepperInstance.previous();
    this.currentIndex.set(this.currentIndex() - 1);
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
}
