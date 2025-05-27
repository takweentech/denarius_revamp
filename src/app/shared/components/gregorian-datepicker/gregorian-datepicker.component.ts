import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gregorian-datepicker',
  imports: [NgbDatepickerModule],
  templateUrl: './gregorian-datepicker.component.html',
  styleUrl: './gregorian-datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GregorianDatepickerComponent),
      multi: true
    }
  ]
})
export class GregorianDatepickerComponent implements ControlValueAccessor {
  value: string = '';

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
}
