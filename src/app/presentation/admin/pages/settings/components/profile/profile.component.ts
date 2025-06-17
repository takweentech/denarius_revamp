import { Component, inject, OnInit, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import {
  UserBasicProfileData,
  UserProfileData,
} from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { DatePipe } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ProfileService } from "../../../../../../data/profile.service";
import { finalize, takeUntil } from "rxjs";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ToastService } from "../../../../../../shared/components/toast/toast.service";

@Component({
  selector: "app-profile",
  imports: [TranslatePipe, DatePipe, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  loading = signal<boolean>(false);
  user: UserProfileData = this.tokenService.getUser();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    this.profileService
      .getBasicPersonalInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.initForm(response.data);

          // Map additional user details from API
          this.user.userProfile = {
            ...this.user.userProfile,
            fullName: response.data.fullName,
            mobileNumber: response.data.mobileNumber,
            nationalId: response.data.idNumber,
            expiryDate: response.data.idExpiryDate,
            nationality: response.data.nationality,
            startDate: response.data.startingDate,
          };
        },
      });
  }

  initForm(data?: UserBasicProfileData) {
    this.form = this.fb.group({
      streetName: [data?.streetName, Validators.required],
      district: [data?.district, Validators.required],
      city: [data?.city, Validators.required],
      postalCode: [data?.postalCode, Validators.required],
      additionalCode: [data?.additionalCode, Validators.required],
      shortAddress: "TEMP",
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    this.profileService
      .saveBasicPersonalInformation(this.form.value)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.toastService.show({
              text: "Address was successfully saved",
              classname: "bg-success text-light",
              icon: "fa-circle-check",
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
  }
}
