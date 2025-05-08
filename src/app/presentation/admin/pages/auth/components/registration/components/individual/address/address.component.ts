import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonalData, Step } from '../../../models/registration.model';


@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  @Input() formGroup!: FormGroup;
  @Input() step!: Step<PersonalData>;
}
