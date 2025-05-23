import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseComponent } from '../../../../../../core/base/base.component';
import { TokenService } from '../../../../../../core/services/token.service';
import { ProfileService } from '../../../../../../data/profile.service';
import { ToastService } from '../../../../../../shared/components/toast/toast.service';
import { UserPersonalData, UserProfileData } from '../../../../../../core/models/user';
import { finalize, forkJoin, takeUntil } from 'rxjs';
import { LangPipe } from '../../../../../../shared/pipes/lang.pipe';
import { Lookup } from '../../../../../../core/models/lookup';
import { LookupService } from '../../../../../../core/services/lookup.service';

@Component({
  selector: 'app-personal',
  imports: [TranslatePipe, ReactiveFormsModule, LangPipe],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent extends BaseComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly lookupService = inject(LookupService);
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  martialStatusList = signal<Lookup[]>([]);
  employmentStatusList = signal<Lookup[]>([]);
  educationLevelList = signal<Lookup[]>([]);
  annualIncomeList = signal<Lookup[]>([]);
  netWorthList = signal<Lookup[]>([]);
  loading = signal<boolean>(false);
  user: UserProfileData = this.tokenService.getUser();
  form!: FormGroup;


  ngOnInit(): void {
    this.initForm();
    this.getLookups();
  }

  getLookups(): void {
    forkJoin({
      martialStatusList: this.lookupService.getMartialStatus(),
      employmentStatusList: this.lookupService.getEmploymentStatus(),
      educationLevelList: this.lookupService.getEducationLevel(),
      annualIncomeList: this.lookupService.getAnnualIncome(),
      netWorthList: this.lookupService.getNetWorth(),
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.martialStatusList.set(response.martialStatusList);
        this.employmentStatusList.set(response.employmentStatusList);
        this.annualIncomeList.set(response.annualIncomeList);
        this.educationLevelList.set(response.educationLevelList);
        this.netWorthList.set(response.netWorthList);
        this.profileService.getPersonalInformation().pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => {
            this.initForm(response.data);
          }
        })
      }
    })
  }


  initForm(data?: UserPersonalData) {
    this.form = this.fb.group({
      maritalStatus: [data?.maritalStatus, Validators.required],
      familyMembersCount: [data?.familyMembersCount, Validators.required],
      educationLevel: [data?.educationLevel, Validators.required],
      employmentStatus: [data?.employmentStatus, Validators.required],
      jobTitle: [data?.jobTitle, Validators.required],
      yearsOfExperience: [data?.yearsOfExperience, Validators.required],
      annualIncome: [data?.annualIncome, Validators.required],
      netWealth: [data?.netWealth, Validators.required]
    })
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    };
    this.loading.set(true);

    this.profileService.savePersonalInformation(this.form.value).pipe(
      finalize(() => this.loading.set(false)),
      takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.toastService.show({ text: "Personal information was successfully saved", classname: 'bg-success text-light', icon: 'fa-circle-check' });
          } else {
            this.toastService.show({ text: response.message, classname: 'bg-danger text-light', icon: 'fa-circle-exclamation' });
          }
        },
        error: (error) => {

        }
      })
  }
}
