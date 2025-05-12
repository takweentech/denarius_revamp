import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { TranslationService } from '../../../../../../../../../core/services/translation.service';

@Component({
  selector: 'app-information',
  imports: [ReactiveFormsModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  readonly translationService = inject(TranslationService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
}
