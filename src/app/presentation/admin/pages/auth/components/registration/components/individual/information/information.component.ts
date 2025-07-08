import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { TranslationService } from '../../../../../../../../../core/services/translation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IslamicDatepickerComponent } from '../../../../../../../../../shared/components/islamic-datepicker/islamic-datepicker.component';
import { GregorianDatepickerComponent } from '../../../../../../../../../shared/components/gregorian-datepicker/gregorian-datepicker.component';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../../../../core/constants/routes.constants';

@Component({
  selector: 'app-information',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, IslamicDatepickerComponent, GregorianDatepickerComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  WEB_ROUTES = WEB_ROUTES;

  readonly translationService = inject(TranslationService);
  lang: string = this.translationService.language;
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
}
