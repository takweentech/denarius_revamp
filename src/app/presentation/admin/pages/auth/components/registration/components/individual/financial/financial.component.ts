import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { BaseComponent } from '../../../../../../../../../core/base/base.component';
import { Lookup } from '../../../../../../../../../core/models/lookup';
import { takeUntil } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LangPipe } from '../../../../../../../../../shared/pipes/lang.pipe';

@Component({
  selector: 'app-financial',
  imports: [ReactiveFormsModule, TranslatePipe, LangPipe],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss',
})
export class FinancialComponent extends BaseComponent implements OnInit {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  martialStatusList = signal<Lookup[]>([]);
  employmentStatusList = signal<Lookup[]>([]);
  educationLevelList = signal<Lookup[]>([]);
  annualIncomeList = signal<Lookup[]>([]);
  netWorthList = signal<Lookup[]>([]);
  jobTitleList = signal<Lookup[]>([]);

  ngOnInit(): void {
    this.getNetWorth();
    this.getAnnualIncome();
    this.getEducationLevel();
    this.getEmploymentStatus();
    this.getMartialStatus();
    this.getJobTitle();
    // Listen for marital status change
    this.formGroup.controls['maritalStatus'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      const familyControl = this.formGroup.controls['familyMembersCount'];

      if (value === 1) {
        familyControl.clearValidators();
        familyControl.setValue(1, { emitEvent: false });
      } else {
        const min = value === 2 ? 2 : 1;

        familyControl.setValidators([Validators.required, Validators.min(min), Validators.max(10)]);
      }

      familyControl.updateValueAndValidity();
    });
    // Listen for employment status change
    this.formGroup.controls['employmentStatus'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(val => {
      console.log(val);

      if (val !== 1 && val !== 2) {
        this.formGroup.controls['jobTitle'].reset(0);
        this.formGroup.controls['yearsOfExperience'].reset(0);
        this.formGroup.controls['jobTitle'].removeValidators([Validators.required]);
        this.formGroup.controls['yearsOfExperience'].removeValidators([Validators.required]);
      } else {
        this.formGroup.controls['jobTitle'].setValidators([Validators.required]);
        this.formGroup.controls['yearsOfExperience'].setValidators([Validators.required]);
      }

      this.formGroup.controls['jobTitle'].updateValueAndValidity();
      this.formGroup.controls['yearsOfExperience'].updateValueAndValidity();
    });
  }

  getJobTitle(): void {
    this.lookupService
      .getJobTitle()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.jobTitleList.set(response);
        },
        error: error => {},
      });
  }

  getMartialStatus(): void {
    this.lookupService
      .getMartialStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.martialStatusList.set(response);
        },
        error: error => {},
      });
  }

  getEmploymentStatus(): void {
    this.lookupService
      .getEmploymentStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.employmentStatusList.set(response);
        },
        error: error => {},
      });
  }

  getEducationLevel(): void {
    this.lookupService
      .getEducationLevel()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.educationLevelList.set(response);
        },
        error: error => {},
      });
  }

  getAnnualIncome(): void {
    this.lookupService
      .getAnnualIncome()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.annualIncomeList.set(response);
        },
        error: error => {},
      });
  }

  getNetWorth(): void {
    {
      this.lookupService
        .getNetWorth()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            this.netWorthList.set(response);
          },
          error: error => {},
        });
    }
  }
}
