import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IndividualAddress, PersonalData, Step } from '../../../models/registration.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<PersonalData>;

  onSelectAddress(address: IndividualAddress): void {
    this.formGroup.setValue({
      district: 0,
      street: address.streetName,
      city: address.city,
      postalCode: address.postCode,
      additionalCode: address.buildingNumber,
    });
  }
}
