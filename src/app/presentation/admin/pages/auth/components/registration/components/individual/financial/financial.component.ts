import { AfterViewInit, Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';

@Component({
  selector: 'app-financial',
  imports: [],
  templateUrl: './financial.component.html',
  styleUrl: './financial.component.scss',
})
export class FinancialComponent {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  martialStatusList = this.lookupService.getMartialStatusList();
  educationLevelList = this.lookupService.getEducationLevelList();
  employmentStatusList = this.lookupService.getEmploymentStatusList();
  annualIncomeList = this.lookupService.getAnnualIncomeList();
  netWorthList = this.lookupService.getEstimatedNetWorthList();
}
