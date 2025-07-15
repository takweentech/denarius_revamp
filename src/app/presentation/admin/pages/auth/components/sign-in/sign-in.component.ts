import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../core/constants/routes.constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../../../../core/services/token.service';
import { RegistrationApiService } from '../../../../../../data/registration.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { ProfileService } from '../../../../../../data/profile.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SignInModes } from '../../enums/auth.enum';
import { TranslationService } from '../../../../../../core/services/translation.service';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe, OtpComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent extends BaseComponent {
  WEB_ROUTES = WEB_ROUTES;
  private readonly registrationService = inject(RegistrationApiService);
  readonly translationService = inject(TranslationService);
  private readonly translateService = inject(TranslateService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly tokenService = inject(TokenService);
  private toastService = inject(ToastService);
  loading = signal<boolean>(false);
  form: FormGroup = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
    rememberMe: true,
  });
  otpForm: FormGroup = this.fb.group({
    otp: [null, Validators.required],
  });
  signInModes = SignInModes;
  mode: SignInModes = SignInModes.FORM;

  validateSignIn(): void {
    if (this.form.valid) {
      this.loading.set(true);
      this.registrationService
        .validateSignIn(this.form.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.loading.set(false))
        )
        .subscribe({
          next: response => {
            if (response.status !== 200) {
              if (response.message === 'Incorrect login information') {
                this.toastService.show({
                  text: this.translateService.instant('AUTHENTICATION.SIGN_IN.INCORRECT_DATA'),
                  classname: 'bg-danger text-light',
                });
              } else {
                this.toastService.show({
                  text: response.message,
                  classname: 'bg-danger text-light',
                });
              }
              return;
            }
            // Set OTP mode
            this.mode = this.signInModes.OTP;
            // Listen for OTP change
            this.otpForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
              next: val => {
                if (val.otp.length === 4) {
                  this.signIn(response.data.token, val.otp, response.data.requestId);
                }
              },
            });
          },
          error: err => {},
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  signIn(token: string, otp: string, requestId: string): void {
    this.registrationService
      .signIn(token, otp, requestId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: response => {
          if (response.status === 200) {
            this.tokenService.setToken(response.data as string);
            this.getUserProfile();
          } else {
            this.toastService.show({
              text: response.message,
              classname: 'bg-danger text-light',
            });
          }
        },
        error: err => {},
      });
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
}
