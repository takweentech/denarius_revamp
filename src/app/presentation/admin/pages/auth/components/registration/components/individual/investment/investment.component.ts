import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LangPipe } from '../../../../../../../../../shared/pipes/lang.pipe';

@Component({
  selector: 'app-investment',
  imports: [ReactiveFormsModule, TranslatePipe, LangPipe],
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
  yesNoLists = this.lookupService.getYesNoOptions();
}
