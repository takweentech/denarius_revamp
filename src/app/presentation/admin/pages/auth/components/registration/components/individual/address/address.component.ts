import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalData, Step } from '../../../models/registration.model';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-address',
  imports: [JsonPipe],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnChanges {

  @Input() formGroup!: FormGroup;
  @Input() step!: Step<PersonalData>;


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.step)
  }
}
