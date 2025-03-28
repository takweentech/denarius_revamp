import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyAmountComponent } from './currency-amount.component';

describe('CurrencyAmountComponent', () => {
  let component: CurrencyAmountComponent;
  let fixture: ComponentFixture<CurrencyAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
