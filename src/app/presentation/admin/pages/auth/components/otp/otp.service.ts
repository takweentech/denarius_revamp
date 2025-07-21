import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { CONFIG } from '../../../../../../core/constants/config.constants';

@Injectable({
  providedIn: 'root',
})
export class OtpService implements OnDestroy {
  public otpCountdown: BehaviorSubject<number> = new BehaviorSubject(0);
  public resendPerformedSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private otpCountdownSub!: Subscription;
  initCountdown(): void {
    this.otpCountdownSub?.unsubscribe(); // Cleanup before starting a new one
    this.otpCountdown.next(CONFIG.OTP_INTERVAL);
    this.otpCountdownSub = timer(0, 1000).subscribe(val => {
      const remaining = CONFIG.OTP_INTERVAL - val;
      if (remaining <= 0) {
        this.otpCountdown.next(0);
        this.otpCountdownSub.unsubscribe();
      } else {
        this.otpCountdown.next(remaining);
      }
    });
  }

  ngOnDestroy(): void {
    this.otpCountdownSub?.unsubscribe();
  }

  emitResend(): void {
    this.resendPerformedSource.next(true);
  }
}
