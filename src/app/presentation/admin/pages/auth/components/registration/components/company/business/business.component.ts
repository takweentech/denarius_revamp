import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { Step } from '../../../models/registration.model';

@Component({
  selector: 'app-business',
  imports: [],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
})
export class BusinessComponent {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  investmentExperienceList = this.lookupService.getInvestmentExperienceList();
  riskToleranceList = this.lookupService.getRiskToleranceList();
}
