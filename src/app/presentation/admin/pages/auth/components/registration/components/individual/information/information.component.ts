import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { TranslationService } from '../../../../../../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-information',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  readonly translationService = inject(TranslationService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;




}
