import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijriDatepickerComponent } from './hijri-datepicker.component';

describe('HijriDatepickerComponent', () => {
  let component: HijriDatepickerComponent;
  let fixture: ComponentFixture<HijriDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HijriDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HijriDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
