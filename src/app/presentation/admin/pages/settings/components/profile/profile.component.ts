import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
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
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  imageUrl = signal<string>("https://i.ibb.co/MBtjqXQ/user.png"); // fallback avatar
  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  loading = signal<boolean>(false);
  user = signal<UserBasicProfileData | null>(null);

  form!: FormGroup;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  ngOnInit(): void {
    this.initForm();

    // Get address data
    this.profileService
      .getBasicPersonalInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.user.set(response.data);
          this.initForm(response.data);
        },
      });

    // Get image
    this.profileService
      .getImageProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.imageUrl.set(response.data); // assuming the API returns a full URL
          }
        },
        error: () => {
          this.imageUrl.set("assets/images/mewees.svg"); // fallback
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
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;

    const file = fileInput.files[0];
    this.selectedFile = file; // Store for saving later

    // Preview the selected image
    const objectUrl = URL.createObjectURL(file);
    this.imageUrl.set(objectUrl); // Update local preview only
  }
  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const saveForm = () => {
      this.profileService
        .saveBasicPersonalInformation(this.form.value)
        .pipe(
          finalize(() => this.loading.set(false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            this.toastService.show({
              text:
                response.status === 200
                  ? "Address was successfully saved"
                  : response.message,
              classname:
                response.status === 200
                  ? "bg-success text-light"
                  : "bg-danger text-light",
              icon:
                response.status === 200
                  ? "fa-circle-check"
                  : "fa-circle-exclamation",
            });
          },
          error: () => {
            this.toastService.show({
              text: "Failed to save address",
              classname: "bg-danger text-light",
              icon: "fa-circle-exclamation",
            });
          },
        });
    };

    // ✅ Upload the image using ONLY the file name
    if (this.selectedFile) {
      const fileName = this.selectedFile.name;

      this.profileService
        .setImageProfile(fileName)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res.status === 200) {
              this.toastService.show({
                text: "Profile image updated",
                classname: "bg-success text-light",
                icon: "fa-circle-check",
              });
            }
            saveForm(); // Continue saving after image update
          },
          error: () => {
            this.toastService.show({
              text: "Image upload failed",
              classname: "bg-danger text-light",
              icon: "fa-circle-exclamation",
            });
            this.loading.set(false);
          },
        });
    } else {
      saveForm();
    }
  }
}
