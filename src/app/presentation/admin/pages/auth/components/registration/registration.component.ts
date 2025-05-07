import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RegistrationService } from './registration.service';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../../core/base/base.component';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BaseComponent implements AfterViewInit, OnInit {
  private readonly registrationService = inject(RegistrationService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  steps = this.registrationService.getStepByType(this.activatedRoute.snapshot.params['type']);

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
      step.controls?.forEach(control => {
        group.addControl(control.key, this.fb.control(control.value));
      });
    });
  }


  onNext() {
    const currentStep = this.steps[this.currentIndex() - 1];
    const stepFormVal = this.signUpForm.controls[currentStep.key].value;
    this.loading.set(true);
    currentStep.apiHandler!(stepFormVal)?.pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (response: any) => {
        if (response.status !== 200) {
          alert(response.message)
        } else {
          // Bind OTP id
          if (currentStep.key === 'information') {
            (this.signUpForm.controls['otp'] as FormGroup).controls['otpId'].setValue(response.data['otpId']);
            (this.signUpForm.controls['otp'] as FormGroup).controls['token'].setValue(response.data['token'])
          }
          this.stepperInstance.next();
          this.currentIndex.set(this.currentIndex() + 1);


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
