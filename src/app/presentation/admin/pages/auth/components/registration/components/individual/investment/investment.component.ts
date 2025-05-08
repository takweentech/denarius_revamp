import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';

@Component({
  selector: 'app-investment',
  imports: [],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  investmentExperienceList = this.lookupService.getInvestmentExperienceList();
  riskToleranceList = this.lookupService.getRiskToleranceList();
  investmentPeriodList = this.lookupService.getInvestmentPeriodList();
  investmentObjectivesList = this.lookupService.getInvestmentObjectivesList();
}
