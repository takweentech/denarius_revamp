import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { UserInvestmentData } from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { ProfileService } from "../../../../../../data/profile.service";
import { LookupService } from "../../../../../../core/services/lookup.service";
import { LangPipe } from "../../../../../../shared/pipes/lang.pipe";

@Component({
  selector: "app-investment",
  imports: [TranslatePipe, ReactiveFormsModule, LangPipe],
  templateUrl: "./investment.component.html",
  styleUrl: "./investment.component.scss",
})
export class InvestmentComponent {
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private readonly lookupService = inject(LookupService);
  investmentExperienceList = this.lookupService.getInvestmentExperienceList();
  riskToleranceList = this.lookupService.getRiskToleranceList();
  investmentPeriodList = this.lookupService.getInvestmentPeriodList();
  investmentObjectivesList = this.lookupService.getInvestmentObjectivesList();
  yesNoLists = this.lookupService.getYesNoOptions();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.profileService.getInvestmentInformation().subscribe({
      next: (response) => {
        this.initForm(response.data);
      }
    })
  }

  initForm(data?: UserInvestmentData) {
    this.form = this.fb.group({
      riskTolerance: [data?.riskTolerance, Validators.required],
      investmentExperience: [data?.investmentExperience, Validators.required],
      investmentHorizon: [data?.investmentHorizon, Validators.required],
      investmentGoal: [data?.investmentGoal, Validators.required],
      isBeneficiary: [data?.isBeneficiary, Validators.required],
    })
  }
}
