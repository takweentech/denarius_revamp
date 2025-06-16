import { Component, inject, Input, OnChanges, signal, SimpleChanges, } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../../../../../../data/account.service';
import { BaseComponent } from '../../../../../../../../core/base/base.component';
import { finalize, takeUntil } from 'rxjs';
import { ToastService } from '../../../../../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe]
})
export class OtpComponent extends BaseComponent implements OnChanges {

  private readonly accountService = inject(AccountService);
  private toastService = inject(ToastService);
  activeModal = inject(NgbActiveModal);
  @Input() newPhoneNumber!: string;
  @Input() requestId!: string;
  @Input() mode!: 'email' | 'phone';
  otp: FormControl = new FormControl(null, [
    Validators.required,

  ]);
  loading = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mode) {
      this.otp.setValidators([Validators.minLength(this.mode === 'email' ? 4 : 6), Validators.maxLength(this.mode === 'email' ? 4 : 6)])
    }
  }

  onConfirm(): void {
    if (this.otp.valid) {
      this.loading.set(true);
      if (this.mode === 'email') {
        this.confirmEmail();
      } else {
        this.confirmPhone();
      }
    };
  }

  confirmPhone(): void {
    this.accountService.confirmPhone({ otp: this.otp.value, newPhoneNumber: this.newPhoneNumber }).pipe(
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.activeModal.close('success')
        } else {
          this.toastService.show({
            text: response.message,
            classname: "bg-danger text-light",
            icon: "fa-circle-exclamation",
          });
        }
      }
    })
  }

  confirmEmail(): void {
    this.accountService.confirmEmail({ otp: this.otp.value, requestId: this.requestId }).pipe(
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.activeModal.close('success')
        } else {
          this.toastService.show({
            text: response.message,
            classname: "bg-danger text-light",
            icon: "fa-circle-exclamation",
          });
        }
      }
    })
  }

}
