import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IndividualAddress, PersonalData, Step } from '../../../models/registration.model';
import { TranslatePipe } from '@ngx-translate/core';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { BaseComponent } from '../../../../../../../../../core/base/base.component';
import { takeUntil } from 'rxjs';
import { Lookup } from '../../../../../../../../../core/models/lookup';
import { LangPipe } from '../../../../../../../../../shared/pipes/lang.pipe';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, TranslatePipe, LangPipe],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent extends BaseComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<PersonalData>;
  private readonly lookupService = inject(LookupService);
  regionsList = signal<Lookup[]>([]);
  citiesList = signal<Lookup[]>([]);

  ngOnInit(): void {
    this.getSaudiCities();
    this.getSaudiRegions();
  }

  onSelectAddress(address: IndividualAddress): void {
    this.formGroup.setValue({
      district: this.regionsList().find(item => item.englishName === address.district)?.id || null,
      street: address.streetName,
      city: this.citiesList().find(item => item.englishName === address.city)?.id || null,
      postalCode: address.postCode,
      additionalCode: address.buildingNumber,
    });
  }

  getSaudiCities(): void {
    this.lookupService
      .getSaudiCities()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.citiesList.set(response);
        },
        error: error => {},
      });
  }

  getSaudiRegions(): void {
    this.lookupService
      .getSaudiRegions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.regionsList.set(response);
        },
        error: error => {},
      });
  }
}
