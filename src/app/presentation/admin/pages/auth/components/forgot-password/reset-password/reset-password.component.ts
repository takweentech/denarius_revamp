import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '../../../../../../../core/base/base.component';
import { AccountService } from '../../../../../../../data/account.service';
import { ToastService } from '../../../../../../../shared/components/toast/toast.service';
import { UserForgetPassword } from '../../../../../../../core/models/account';
import { REGEX_PATTERNS } from '../../../../../../../core/constants/patterns.constants';
import { matchValidator } from '../../../../../../../core/validators/form.validators';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  readonly formGroup = this.fb.group(
    {
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      newPassword: ['', [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)]],
      confirmedPassword: ['', Validators.required],
    },
    { validators: matchValidator('newPassword', 'confirmedPassword') }
  );

  readonly otpLength = 4;
  readonly mode: 'reset-password' = 'reset-password';
  readonly loading = signal<boolean>(false);

  requestId!: string;
  testOtp?: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('id') || '';

      if (!this.requestId) {
        this.toastService.show({
          text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.MISSING_REQUEST_ID'),
          classname: 'bg-danger text-light',
        });
        this.router.navigate(['/auth/forgot-password']);
        return;
      }

      if (this.testOtp) {
        this.formGroup.patchValue({ otp: this.testOtp });
        this.onConfirm();
      }
    });
  }

  onConfirm(): void {
    if (this.formGroup.invalid) return;

    this.loading.set(true);

    if (this.mode === 'reset-password') {
      this.confirmResetPassword();
    }
  }

  private confirmResetPassword(): void {
    const token = localStorage.getItem('reset_token');
    if (!token) {
      this.toastService.show({
        text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.MISSING_TOKEN'),
        classname: 'bg-danger text-light',
      });
      this.router.navigate(['/auth/forgot-password']);
      return;
    }

    const payload: UserForgetPassword = {
      otp: this.formGroup.value.otp ?? '',
      newPassword: this.formGroup.value.newPassword ?? '',
      confirmedPassword: this.formGroup.value.confirmedPassword ?? '',
      requestId: this.requestId,
    };

    this.accountService
      .verifyForgetPasswordOtp(payload)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: res => {
          if (res.status === 200) {
            this.toastService.show({
              text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.SUCCESS_RESET'),
              classname: 'bg-success text-light',
            });
            this.router.navigate(['/auth/sign-in']);
          } else {
            this.toastService.show({
              text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.ERROR_MESSAGE'),
              classname: 'bg-danger text-light',
              icon: 'fa-circle-exclamation',
            });
          }
        },
        error: err => {
          this.toastService.show({
            text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.OTP_FAILED'),
            classname: 'bg-danger text-light',
            icon: 'fa-circle-exclamation',
          });
        },
      });
  }
}
