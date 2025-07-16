import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe } from '@ngx-translate/core';
import { Step } from '../registration/models/registration.model';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { OtpService } from './otp.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe],
})
export class OtpComponent extends BaseComponent implements OnInit {
  private readonly otpService = inject(OtpService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  otpCountdown = signal<number>(0);

  ngOnInit(): void {
    this.otpService.otpCountdown.pipe(takeUntil(this.destroy$)).subscribe({
      next: val => {
        this.otpCountdown.set(val);
      },
    });
  }

  onResendOtp(): void {
    this.otpService.emitResend();
  }
}
