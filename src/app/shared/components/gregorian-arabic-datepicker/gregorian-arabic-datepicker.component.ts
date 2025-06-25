import { Component, forwardRef, Injectable } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

// أيام الأسبوع بالعربي
const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];

// الشهور الميلادية بالعربي
const MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

@Injectable()
export class ArabicGregorianI18n extends NgbDatepickerI18n {
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
  selector: 'app-gregorian-arabic-datepicker',
  imports: [NgbDatepickerModule],
  templateUrl: './gregorian-arabic-datepicker.component.html',
  styleUrl: './gregorian-arabic-datepicker.component.scss',
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
    { provide: NgbDatepickerI18n, useClass: ArabicGregorianI18n },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GregorianArabicDatepickerComponent),
      multi: true,
    },
  ],
})
export class GregorianArabicDatepickerComponent implements ControlValueAccessor {
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
