import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';

@Component({
  selector: 'app-information',
  imports: [ReactiveFormsModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
}
