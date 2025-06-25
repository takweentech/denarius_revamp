import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gregorian-datepicker',
  imports: [NgbDatepickerModule],
  templateUrl: './gregorian-datepicker.component.html',
  styleUrl: './gregorian-datepicker.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GregorianDatepickerComponent),
      multi: true,
    },
  ],
})
export class GregorianDatepickerComponent implements ControlValueAccessor {
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
