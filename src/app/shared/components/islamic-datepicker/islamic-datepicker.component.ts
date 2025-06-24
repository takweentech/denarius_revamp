import { Component, forwardRef, Injectable } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  NgbCalendar,
  NgbCalendarIslamicCivil,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-islamic-datepicker',
  imports: [NgbDatepickerModule],
  templateUrl: './islamic-datepicker.component.html',
  styleUrl: './islamic-datepicker.component.scss',
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IslamicDatepickerComponent),
      multi: true,
    },
  ],
})
export class IslamicDatepickerComponent implements ControlValueAccessor {
  value: string = '';
  minDate: NgbDateStruct = {
    day: 1,
    month: 1,
    year: 1940,
  };
  maxDate: NgbDateStruct = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onDateSelect(date: NgbDateStruct): void {
    const formatted = `${date.year}-${date.month}-${date.day}`;
    this.value = formatted;
    this.onChange?.(formatted);
    this.onTouched?.();
  }
}
