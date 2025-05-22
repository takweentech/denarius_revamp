import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { UserInvestmentData } from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { ProfileService } from "../../../../../../data/profile.service";
import { LookupService } from "../../../../../../core/services/lookup.service";
import { LangPipe } from "../../../../../../shared/pipes/lang.pipe";
import { Lookup } from "../../../../../../core/models/lookup";
import { takeUntil } from "rxjs";
import { BaseComponent } from "../../../../../../core/base/base.component";

@Component({
  selector: "app-investment",
  imports: [TranslatePipe, ReactiveFormsModule, LangPipe],
  templateUrl: "./investment.component.html",
  styleUrl: "./investment.component.scss",
})
export class InvestmentComponent extends BaseComponent {
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private readonly lookupService = inject(LookupService);
  investmentExperienceList = signal<Lookup[]>([]);
  riskToleranceList = signal<Lookup[]>([]);
  investmentPeriodList = signal<Lookup[]>([]);
  investmentObjectivesList = signal<Lookup[]>([]);
  yesNoLists = this.lookupService.getYesNoOptions();

  form!: FormGroup;

  ngOnInit(): void {
    this.getInvestmentDuration();
    this.getInvestmentExperience();
    this.getInvestmentGoal();
    this.getRiskTolerance();
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


  getRiskTolerance(): void {
    this.lookupService.getRiskTolerance().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.riskToleranceList.set(response);
      }
    })
  }
  getInvestmentExperience(): void {
    this.lookupService.getInvestmentExperience().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.investmentExperienceList.set(response)
      }
    })
  }
  getInvestmentDuration(): void {
    this.lookupService.getInvestmentDuration().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.investmentPeriodList.set(response)
      }
    })
  }
  getInvestmentGoal(): void {
    this.lookupService.getInvestmentGoal().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.investmentObjectivesList.set(response)
      }
    })
  }

}
