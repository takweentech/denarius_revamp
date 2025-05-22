import { Component, inject, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { UserBasicProfileData, UserProfileData } from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProfileService } from "../../../../../../data/profile.service";

@Component({
  selector: "app-profile",
  imports: [TranslatePipe, DatePipe, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {

  private readonly tokenService = inject(TokenService);
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);

  user: UserProfileData = this.tokenService.getUser();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.profileService.getBasicPersonalInformation().subscribe({
      next: (response) => {
        this.initForm(response.data);
      }
    })
  }

  initForm(data?: UserBasicProfileData) {
    this.form = this.fb.group({
      streetName: [data?.streetName, Validators.required],
      district: [data?.district, Validators.required],
      city: [data?.city, Validators.required],
      postalCode: [data?.postalCode, Validators.required],
      additionalCode: [data?.additionalCode, Validators.required],
    })
  }
}
