import { Component, inject, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TokenService } from "../../../../../../core/services/token.service";
import { ProfileService } from "../../../../../../data/profile.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserBankData, UserProfileData } from "../../../../../../core/models/user";
import { LookupService } from "../../../../../../core/services/lookup.service";
import { Lookup } from "../../../../../../core/models/lookup";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { takeUntil } from "rxjs";

@Component({
  selector: "app-bank",
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: "./bank.component.html",
  styleUrl: "./bank.component.scss",
})
export class BankComponent extends BaseComponent {
  private readonly profileService = inject(ProfileService);
  private readonly lookupService = inject(LookupService);
  private readonly fb = inject(FormBuilder);
  bankList = signal<Lookup[]>([]);

  form!: FormGroup;

  getBanks(): void {
    this.lookupService.getBanks().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.bankList.set(response)
      }
    })
  }

  ngOnInit(): void {
    this.getBanks();
    this.initForm();
    this.profileService.getBankInformation().subscribe({
      next: (response) => {
        this.initForm(response.data);
      }
    })
  }

  initForm(data?: UserBankData) {
    this.form = this.fb.group({
      bankId: [data?.bankId, Validators.required],
      accountBeneficiaryName: [data?.accountBeneficiaryName, Validators.required],
      iban: [data?.iban, Validators.required],
    })
  }
}
