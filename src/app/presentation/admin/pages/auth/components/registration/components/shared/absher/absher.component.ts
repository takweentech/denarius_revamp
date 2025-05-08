import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-absher',
  imports: [NgOtpInputComponent],
  templateUrl: './absher.component.html',
  styleUrl: './absher.component.scss',
})
export class AbsherComponent {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;

}
