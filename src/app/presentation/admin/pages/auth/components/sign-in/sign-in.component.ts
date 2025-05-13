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

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent extends BaseComponent {
  WEB_ROUTES = WEB_ROUTES;
  private readonly registrationService = inject(RegistrationApiService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly tokenService = inject(TokenService);
  private toastService = inject(ToastService);
  loading = signal<boolean>(false);
  form: FormGroup = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
    rememberMe: true
  })

  onSignIn(): void {
    if (this.form.valid) {
      this.loading.set(true)
      this.registrationService.signIn(this.form.value).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false)),
      ).subscribe({
        next: (response: any) => {
          if (response.status !== 200) {
            this.toastService.show({ text: response.message, classname: 'bg-danger text-light' });
            return
          }
          this.tokenService.setToken(response.data?.token);
          this.getUserProfile();
        },
        error: (err) => {

        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  getUserProfile(): void {
    this.profileService.getUserProfile().pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.set(false)),
    ).subscribe({
      next: (response: any) => {
        this.tokenService.setUser(response.data?.profileInfo);
        this.router.navigate(['/' + WEB_ROUTES.DASHBOARD.ROOT]);
      },
      error: (err) => {

      }
    })
  }

}
