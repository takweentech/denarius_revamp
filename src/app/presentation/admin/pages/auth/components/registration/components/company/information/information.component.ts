import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step } from '../../../models/registration.model';
import { TranslationService } from '../../../../../../../../../core/services/translation.service';
import { LangChangeEvent, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GregorianDatepickerComponent } from '../../../../../../../../../shared/components/gregorian-datepicker/gregorian-datepicker.component';
import { IslamicDatepickerComponent } from '../../../../../../../../../shared/components/islamic-datepicker/islamic-datepicker.component';
import { RouterLink } from '@angular/router';
import { WEB_ROUTES } from '../../../../../../../../../core/constants/routes.constants';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../../../../../core/base/base.component';

@Component({
  selector: 'app-information',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, IslamicDatepickerComponent, GregorianDatepickerComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent extends BaseComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  readonly translateService = inject(TranslateService);

  lang: string = this.translationService.language;
  WEB_ROUTES = WEB_ROUTES;
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<{}>;
  @Input() requestId!: string;
  @Input() displayResendOtp!: boolean;
  ngOnInit(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }
}
