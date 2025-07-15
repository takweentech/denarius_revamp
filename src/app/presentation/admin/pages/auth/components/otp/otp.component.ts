import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe } from '@ngx-translate/core';
import { Step } from '../registration/models/registration.model';
import { Subscription, takeUntil, timer } from 'rxjs';
import { CONFIG } from '../../../../../../core/constants/config.constants';
import { BaseComponent } from '../../../../../../core/base/base.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe],
})
export class OtpComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  @Input() displayResendOtp!: boolean;
  @Output() resendOtp = new EventEmitter<void>();
  otpCountdown = signal<number>(0);
  private otpCountdown$!: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayResendOtp'].currentValue) {
      this.initCountdown();
    }
  }

  ngOnInit(): void {}

  initCountdown(): void {
    this.otpCountdown.set(CONFIG.OTP_INTERVAL);
    this.otpCountdown$ = timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        if (val == CONFIG.OTP_INTERVAL) {
          this.otpCountdown.set(0);
          this.otpCountdown$.unsubscribe();
        } else {
          this.otpCountdown.set(this.otpCountdown() - 1);
        }
      });
  }

  onResendOtp(): void {
    this.resendOtp.emit();
    this.initCountdown();
  }
}
