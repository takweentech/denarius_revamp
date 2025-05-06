import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RegistrationService } from './registration.service';
import { ActivatedRoute } from '@angular/router';
import Stepper from 'bs-stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements AfterViewInit {
  private readonly registrationService = inject(RegistrationService);
  private readonly activatedRoute = inject(ActivatedRoute);
  steps = this.registrationService.getStepByType(this.activatedRoute.snapshot.params['type']);

  @ViewChild('stepperRef', { static: false }) stepperRef!: ElementRef;
  private stepperInstance!: Stepper;
  currentIndex = signal(1);;


  constructor() {
  }


  onNext() {
    this.stepperInstance.next();
    this.currentIndex.set(this.currentIndex() + 1);

  }


  onPrev() {
    this.stepperInstance.previous();
    this.currentIndex.set(this.currentIndex() - 1);
  }




  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.stepperRef && !this.stepperInstance) {
        this.stepperInstance = new Stepper(this.stepperRef.nativeElement, {
          linear: false,
          animation: true,
        });
      }
    });
  }
}
