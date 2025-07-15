import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UserBasicProfileData, UserProfileData } from '../../../../../../core/models/user';
import { TokenService } from '../../../../../../core/services/token.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../../data/profile.service';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { FileService } from '../../../../../../data/file.service';
import { Lookup } from '../../../../../../core/models/lookup';
import { LookupService } from '../../../../../../core/services/lookup.service';
import { LangPipe } from '../../../../../../shared/pipes/lang.pipe';

@Component({
  selector: 'app-profile',
  imports: [TranslatePipe, DatePipe, ReactiveFormsModule, LangPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private readonly fileService = inject(FileService);
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private readonly lookupService = inject(LookupService);
  regionsList = signal<Lookup[]>([]);
  citiesList = signal<Lookup[]>([]);
  loading = signal<boolean>(false);
  sessionUserData = signal<UserProfileData | null>(this.tokenService.getUser());
  user = signal<UserBasicProfileData | null>(null);
  form!: FormGroup;
  uploadedImage = signal<string>('');
  ngOnInit(): void {
    this.getSaudiCities();
    this.getSaudiRegions();
    this.initForm();
    this.profileService
      .getBasicPersonalInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.user.set(response.data);
          this.initForm(response.data);
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
      shortAddress: 'TEMP',
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    this.profileService
      .saveBasicPersonalInformation({ ...this.form.value, city: Number(this.form.value.city) })
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: response => {
          if (response.status == 200) {
            this.toastService.show({
              text: 'Address was successfully saved',
              classname: 'bg-success text-light',
              icon: 'fa-circle-check',
            });
          } else {
            this.toastService.show({
              text: response.message,
              classname: 'bg-danger text-light',
              icon: 'fa-circle-exclamation',
            });
          }
        },
        error: error => {},
      });
  }

  getSaudiRegions(): void {
    this.lookupService
      .getSaudiRegions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.regionsList.set(response);
        },
        error: error => {},
      });
  }

  getSaudiCities(): void {
    this.lookupService
      .getSaudiCities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.citiesList.set(response);
        },
        error: error => {},
      });
  }

  onProfileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.uploadedImage.set(reader.result as string);
      this.uploadProfileImage(files[0]);
    };
  }

  uploadProfileImage(file: File): void {
    this.fileService
      .uploadInvestor(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.setProfileImage(response.fileName);
        },
        error: error => {},
      });
  }

  setProfileImage(path: string): void {
    this.profileService
      .saveProfileImage(path)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.getProfileImage();
        },
        error: error => {},
      });
  }

  getProfileImage(): void {
    this.profileService
      .getProfileImage()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.tokenService.setUser({
            ...this.tokenService.getUser(),
            userProfile: { ...this.tokenService.getUser().userProfile, profileImageUrl: response.data as string },
          });
        },
        error: error => {
          this.toastService.show({
            text: error.message,
            classname: 'bg-danger text-light',
            icon: 'fa-circle-exclamation',
          });
        },
      });
  }
}
