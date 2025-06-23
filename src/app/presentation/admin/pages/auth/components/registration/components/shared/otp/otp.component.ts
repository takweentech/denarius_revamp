import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Step } from '../../../models/registration.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe],
})
export class OtpComponent {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
}
