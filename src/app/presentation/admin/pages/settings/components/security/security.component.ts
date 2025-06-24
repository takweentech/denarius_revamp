import { Component, inject, signal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { finalize, takeUntil } from "rxjs";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ToastService } from "../../../../../../shared/components/toast/toast.service";
import { AccountService } from "../../../../../../data/account.service";
import { TranslationService } from "../../../../../../core/services/translation.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OtpComponent } from "./components/otp/otp.component";
import { matchValidator } from "../../../../../../core/validators/form.validators";
import { REGEX_PATTERNS } from "../../../../../../core/constants/patterns.constants";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-security",
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: "./security.component.html",
  styleUrl: "./security.component.scss",
})
export class SecurityComponent extends BaseComponent {
  private readonly accountService = inject(AccountService);
  private readonly modalService = inject(NgbModal);
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  readonly translationService = inject(TranslationService);
  readonly translateService = inject(TranslateService);
  loading = signal<boolean>(false);

  passwordForm: FormGroup = this.fb.group(
    {
      currentPassword: [null, [Validators.required]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(REGEX_PATTERNS.PASSWORD)],
      ],
      confirmedPassword: [null, Validators.required],
    },
    { validators: matchValidator("newPassword", "confirmedPassword") }
  );
  phoneForm: FormGroup = this.fb.group({
    newPhoneNumber: [
      null,
      [Validators.required, Validators.pattern(REGEX_PATTERNS.PHONE_NUMBER)],
    ],
  });
  emailForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  savePassword(): void {
    if (this.passwordForm.valid) {
      this.loading.set(true);

      this.accountService
        .changePassword(this.passwordForm.value)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if (response.status == 200) {
              this.toastService.show({
                text: this.translateService.instant(
                  "SETTINGS.SECURITY.PASSWORD_CHANGED_SUCCESS"
                ),
                classname: "bg-success text-light",
                icon: "fa-circle-check",
              });
              this.passwordForm.reset();
            } else {
              this.toastService.show({
                text: response.message,
                classname: "bg-danger text-light",
                icon: "fa-circle-exclamation",
              });
            }
          },
          error: (error) => {},
        });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  savePhoneNumber(): void {
    if (this.phoneForm.valid) {
      this.loading.set(true);
      this.accountService
        .changePhone(this.phoneForm.value)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if (response.status == 200) {
              const modalRef = this.modalService.open(OtpComponent, {
                centered: true,
              });
              modalRef.componentInstance.newPhoneNumber =
                this.phoneForm.value.newPhoneNumber;
              modalRef.componentInstance.mode = "phone";
              modalRef.result.then((result) => {
                if (result) {
                  this.toastService.show({
                    text: this.translateService.instant(
                      "SETTINGS.SECURITY.PHONE_CHANGE_SUCCESS"
                    ),
                    classname: "bg-success text-light",
                    icon: "fa-circle-check",
                  });
                  this.phoneForm.reset();
                }
              });
            } else {
              this.toastService.show({
                text: response.message,
                classname: "bg-danger text-light",
                icon: "fa-circle-exclamation",
              });
            }
          },
          error: (error) => {},
        });
    } else {
      this.phoneForm.markAllAsTouched();
    }
  }

  saveEmail(): void {
    if (this.emailForm.valid) {
      this.loading.set(true);

      this.accountService
        .changeEmail(this.emailForm.value)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            if (response.status == 200) {
              const modalRef = this.modalService.open(OtpComponent, {
                centered: true,
              });
              modalRef.componentInstance.requestId = response.data.requestId;
              modalRef.componentInstance.mode = "email";
              modalRef.result.then((result) => {
                if (result) {
                  this.toastService.show({
                    text: this.translateService.instant(
                      "SETTINGS.SECURITY.EMAIL_CHANGE_SUCCESS"
                    ),
                    classname: "bg-success text-light",
                    icon: "fa-circle-check",
                  });
                  this.emailForm.reset();
                }
              });
            } else {
              this.toastService.show({
                text: response.message,
                classname: "bg-danger text-light",
                icon: "fa-circle-exclamation",
              });
            }
          },
          error: (error) => {},
        });
    } else {
      this.phoneForm.markAllAsTouched();
    }
  }
}
