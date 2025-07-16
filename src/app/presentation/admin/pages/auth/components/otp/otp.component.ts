import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Step } from '../registration/models/registration.model';
import { Subscription, takeUntil, timer } from 'rxjs';
import { CONFIG } from '../../../../../../core/constants/config.constants';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { RegistrationApiService } from '../../../../../../data/registration.service';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe],
})
export class OtpComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() requestId!: string;

  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  @Input() displayResendOtp!: boolean;
  @Output() resendOtp = new EventEmitter<void>();
  otpCountdown = signal<number>(0);
  private otpCountdown$!: Subscription;
  readonly translateService = inject(TranslateService);

  private readonly registrationAPIService = inject(RegistrationApiService);
  private readonly toastService = inject(ToastService);
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['displayResendOtp'].currentValue) {
  //     this.initCountdown();
  //   }
  // }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requestId'] && changes['requestId'].currentValue) {
      this.initCountdown();
    }
  }
  initCountdown(): void {
    const total = CONFIG.OTP_INTERVAL ?? 60;

    console.log('OTP Countdown initialized with total:', total);
    if (this.otpCountdown$ && !this.otpCountdown$.closed) {
      this.otpCountdown$.unsubscribe();
    }

    this.otpCountdown.set(total);

    this.otpCountdown$ = timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        const remaining = total - val;
        if (remaining <= 0) {
          this.otpCountdown.set(0);
          this.otpCountdown$.unsubscribe();
        } else {
          this.otpCountdown.set(remaining);
        }
      });
  }

  onResendOtp(): void {
    if (!this.requestId) return;

    this.registrationAPIService
      .resendOtp(this.requestId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response.status === 200) {
            this.toastService.show({
              text: this.translateService.instant('AUTHENTICATION.REGISTRATION.COMPANY.OTP.FORM.OTP.RESEND_SUCCESS'),
              classname: 'bg-success text-light',
            });
            this.initCountdown();
          } else {
            this.toastService.show({
              text: response.message,
              classname: 'bg-danger text-light',
            });
          }
        },
        error: () => {
          this.toastService.show({
            text: this.translateService.instant('AUTHENTICATION.REGISTRATION.COMPANY.OTP.FORM.OTP.RESEND_FAILED'),
            classname: 'bg-danger text-light',
          });
        },
      });
  }
}
