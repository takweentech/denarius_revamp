import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { HttpCustomResponse } from '../../../../../../core/models/http';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../../../../data/account.service';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { REGEX_PATTERNS } from '../../../../../../core/constants/patterns.constants';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { Router, RouterModule } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../../core/base/base.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, TranslatePipe, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent extends BaseComponent {
  readonly loading = signal<boolean>(false);

  readonly translationService = inject(TranslationService);
  lang: string = this.translationService.language;
  WEB_ROUTES = WEB_ROUTES;
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  private toastService = inject(ToastService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  form: FormGroup = this.fb.group({
    phoneNumber: [null, [Validators.required, Validators.pattern(REGEX_PATTERNS.PHONE_NUMBER)]],
  });
  message: string | null = null;
  error: string | null = null;

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
            // ✅ Valid success case
            const { requestId, token, testOtp } = res.data;

            localStorage.setItem('reset_request_id', requestId);
            localStorage.setItem('reset_token', token);
            localStorage.setItem('reset_otp_debug', testOtp.toString());

            this.toastService.show({
              text: this.translateService.instant('AUTHENTICATION.FORGOT_PASSWORD.SUCCESS_MESSAGE'),
              classname: 'bg-success text-light',
            });

            this.router.navigate([
              this.WEB_ROUTES.AUTH.ROOT,
              this.WEB_ROUTES.AUTH.FORGOT_PASSWORD.ROOT,
              this.WEB_ROUTES.AUTH.FORGOT_PASSWORD.RESET_PASSWORD,
              requestId,
            ]);

            console.log(
              this.WEB_ROUTES.AUTH.ROOT,
              this.WEB_ROUTES.AUTH.FORGOT_PASSWORD.ROOT,
              this.WEB_ROUTES.AUTH.FORGOT_PASSWORD.RESET_PASSWORD,
              requestId
            );
          } else {
            // ✅ Fake success: backend returned 200 but no useful data → show error
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
}
