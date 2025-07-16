import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { CONFIG } from '../../../../../../core/constants/config.constants';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  public otpCountdown: BehaviorSubject<number> = new BehaviorSubject(0);
  public resendPerformedSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private otpCountdownSub!: Subscription;
  initCountdown(): void {
    this.otpCountdown.next(CONFIG.OTP_INTERVAL);
    this.otpCountdownSub = timer(0, 1000).subscribe(val => {
      if (val == CONFIG.OTP_INTERVAL) {
        this.otpCountdown.next(0);
        this.otpCountdownSub.unsubscribe();
      } else {
        this.otpCountdown.next(this.otpCountdown.value - 1);
      }
    });
  }

  emitResend(): void {
    this.resendPerformedSource.next(true);
  }
}
