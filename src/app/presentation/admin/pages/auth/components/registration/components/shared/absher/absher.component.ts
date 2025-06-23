import { AfterViewInit, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { NgOtpInputComponent } from 'ng-otp-input';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-absher',
  imports: [NgOtpInputComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './absher.component.html',
  styleUrl: './absher.component.scss',
})
export class AbsherComponent {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
}
