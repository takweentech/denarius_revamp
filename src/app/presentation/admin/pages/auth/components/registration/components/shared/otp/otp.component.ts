import { Component, AfterViewInit, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [NgOtpInputComponent, ReactiveFormsModule]
})
export class OtpComponent {
  @Input() formGroup!: FormGroup;

}
