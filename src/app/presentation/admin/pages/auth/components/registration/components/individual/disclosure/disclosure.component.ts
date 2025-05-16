import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { TranslatePipe } from '@ngx-translate/core';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { LangPipe } from '../../../../../../../../../shared/pipes/lang.pipe';

@Component({
  selector: 'app-disclosure',
  imports: [ReactiveFormsModule, TranslatePipe, LangPipe],
  templateUrl: './disclosure.component.html',
  styleUrl: './disclosure.component.scss'
})
export class DisclosureComponent {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;

  yesNoLists = this.lookupService.getYesNoOptions();

}
