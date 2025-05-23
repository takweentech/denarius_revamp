import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { UserInvestmentData } from "../../../../../../core/models/user";
import { TokenService } from "../../../../../../core/services/token.service";
import { ProfileService } from "../../../../../../data/profile.service";
import { LookupService } from "../../../../../../core/services/lookup.service";
import { LangPipe } from "../../../../../../shared/pipes/lang.pipe";
import { Lookup } from "../../../../../../core/models/lookup";
import { finalize, forkJoin, takeUntil } from "rxjs";
import { BaseComponent } from "../../../../../../core/base/base.component";
import { ToastService } from "../../../../../../shared/components/toast/toast.service";

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
  private toastService = inject(ToastService);

  loading = signal<boolean>(false);
  investmentExperienceList = signal<Lookup[]>([]);
  riskToleranceList = signal<Lookup[]>([]);
  investmentPeriodList = signal<Lookup[]>([]);
  investmentObjectivesList = signal<Lookup[]>([]);
  yesNoLists = this.lookupService.getYesNoOptions();



  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getLookups();

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

  getLookups(): void {
    forkJoin({
      riskToleranceList: this.lookupService.getRiskTolerance(),
      investmentExperienceList: this.lookupService.getInvestmentExperience(),
      investmentPeriodList: this.lookupService.getInvestmentDuration(),
      investmentObjectivesList: this.lookupService.getInvestmentGoal(),
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.riskToleranceList.set(response.riskToleranceList);
        this.investmentExperienceList.set(response.investmentExperienceList);
        this.investmentPeriodList.set(response.investmentPeriodList);
        this.investmentObjectivesList.set(response.investmentObjectivesList);
        this.profileService.getInvestmentInformation().subscribe({
          next: (response) => {
            this.initForm(response.data);
          }
        })
      }
    })
  }


  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    };
    this.loading.set(true);

    this.profileService.saveInvestmentInformation(this.form.value).pipe(
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.toastService.show({ text: "Investment information was successfully saved", classname: 'bg-success text-light', icon: 'fa-circle-check' });
          } else {
            this.toastService.show({ text: response.message, classname: 'bg-danger text-light', icon: 'fa-circle-exclamation' });
          }
        },
        error: (error) => {

        }
      })
  }


}
