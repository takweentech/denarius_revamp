import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Step } from '../../../models/registration.model';

@Component({
  selector: 'app-disclosure',
  imports: [],
  templateUrl: './disclosure.component.html',
  styleUrl: './disclosure.component.scss'
})
export class DisclosureComponent {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
}
