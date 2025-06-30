import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BaseComponent } from '../../../../../../core/base/base.component';
import { AccountService } from '../../../../../../data/account.service';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { UserForgetPassword } from '../../../../../../core/models/account';
import { REGEX_PATTERNS } from '../../../../../../core/constants/patterns.constants';
import { matchValidator } from '../../../../../../core/validators/form.validators';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { HttpCustomResponse } from '../../../../../../core/models/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, TranslatePipe, CommonModule, NgOtpInputComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  readonly loading = signal<boolean>(false);

  readonly translationService = inject(TranslationService);
  lang: string = this.translationService.language;
  WEB_ROUTES = WEB_ROUTES;
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  mode: 'forget-password' | 'reset-password' = 'forget-password';

  form: FormGroup = this.fb.group({
    phoneNumber: [null, [Validators.required, Validators.pattern(REGEX_PATTERNS.PHONE_NUMBER)]],
  });

  readonly formGroup = this.fb.group(
    {
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      newPassword: ['', [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)]],
      confirmedPassword: ['', Validators.required],
    },
    { validators: matchValidator('newPassword', 'confirmedPassword') }
  );

  readonly otpLength = 4;

  message: string | null = null;
  error: string | null = null;

  requestId!: string;
  testOtp?: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const reqId = params.get('id');

      if (reqId) {
        this.mode = 'reset-password';
        this.requestId = reqId;

        if (this.testOtp) {
          this.formGroup.patchValue({ otp: this.testOtp });
          this.onConfirm();
        }
      } else {
        this.mode = 'forget-password';
      }
    });
  }

  onSubmit(): void {
    this.message = null;
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const mobileNumber = this.form.value.phoneNumber;

    this.accountService
      .forgetPassword(mobileNumber)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (res: HttpCustomResponse<{ testOtp: number; token: string; requestId: string } | string>) => {
          const fallback = this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.ERROR_MESSAGE');

          if (typeof res.data !== 'string' && res.data) {
            const { requestId, token, testOtp } = res.data;

            localStorage.setItem('reset_request_id', requestId);
            localStorage.setItem('reset_token', token);
            localStorage.setItem('reset_otp_debug', testOtp.toString());

            this.toastService.show({
              text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.SUCCESS_MESSAGE'),
              classname: 'bg-success text-light',
            });

            this.mode = 'reset-password';
            this.requestId = requestId;
            this.testOtp = testOtp.toString();
          } else {
            const backendMsg = typeof res.data === 'string' && res.data ? res.data : fallback;

            this.toastService.show({
              text: backendMsg,
              classname: 'bg-danger text-light',
            });

            this.error = backendMsg;
          }
        },

        error: err => {
          const fallback = this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.ERROR_MESSAGE');

          let backendMsg = err?.error?.message;

          if (backendMsg === 'User not found') {
            backendMsg = this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.USER_NOT_FOUND');
          }

          this.error = backendMsg || fallback;

          this.toastService.show({
            text: backendMsg || fallback,
            classname: 'bg-danger text-light',
          });
        },
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
