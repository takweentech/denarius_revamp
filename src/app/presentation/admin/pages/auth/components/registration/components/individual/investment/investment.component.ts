import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LangPipe } from '../../../../../../../../../shared/pipes/lang.pipe';
import { BaseComponent } from '../../../../../../../../../core/base/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-investment',
  imports: [ReactiveFormsModule, TranslatePipe, LangPipe],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss',
})
export class InvestmentComponent extends BaseComponent implements OnInit {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  investmentExperienceList = this.lookupService.getInvestmentExperienceList();
  riskToleranceList = this.lookupService.getRiskToleranceList();
  investmentPeriodList = this.lookupService.getInvestmentPeriodList();
  investmentObjectivesList = this.lookupService.getInvestmentObjectivesList();
  yesNoLists = this.lookupService.getYesNoOptions();
  ngOnInit(): void {
    this.formGroup.controls['isBeneficiary'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      const beneficiaryControl = this.formGroup.controls['beneficiaryIdNumber'];

      if (value === 1) {
        beneficiaryControl.setValidators([Validators.required]);
      } else {
        beneficiaryControl.clearValidators();
        beneficiaryControl.reset(null);
      }

      beneficiaryControl.updateValueAndValidity();
    });
  }
}
