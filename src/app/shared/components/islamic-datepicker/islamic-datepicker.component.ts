import { Component, forwardRef, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class IslamicDatepickerComponent implements ControlValueAccessor, OnChanges {
  @Input() allowFutureDate!: boolean;

  value: string = '';
  minDate: NgbDateStruct = {
    day: 1,
    month: 1,
    year: 1340,
  };
  maxDate: NgbDateStruct = (() => {
    const today = new Date();
    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    const parts = hijriFormatter.formatToParts(today);
    const hijriDate: Partial<NgbDateStruct> = {};

    const convertArabicNumbers = (input: string): number => {
      const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
      return +input.replace(/[٠-٩]/g, digit => arabicDigits.indexOf(digit).toString());
    };

    for (const part of parts) {
      if (part.type === 'day') hijriDate.day = convertArabicNumbers(part.value);
      if (part.type === 'month') hijriDate.month = convertArabicNumbers(part.value);
      if (part.type === 'year') hijriDate.year = convertArabicNumbers(part.value);
    }

    return {
      day: hijriDate.day!,
      month: hijriDate.month!,
      year: hijriDate.year!,
    };
  })();
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allowFutureDate'].currentValue) {
      this.maxDate = {
        day: 1,
        month: 1,
        year: 1500,
      };
    }
  }

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
