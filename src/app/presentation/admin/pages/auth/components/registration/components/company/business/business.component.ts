import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LookupService } from '../../../../../../../../../core/services/lookup.service';
import { CompanyData, Step } from '../../../models/registration.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-business',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './business.component.html',
  styleUrl: './business.component.scss',
})
export class BusinessComponent {
  private readonly lookupService = inject(LookupService);
  @Input() formGroup!: FormGroup;
  @Input() step!: Step<CompanyData>;
  investmentExperienceList = this.lookupService.getInvestmentExperienceList();
  riskToleranceList = this.lookupService.getRiskToleranceList();

  // onFileChange(event: Event) {
  //   const file = (event.target as HTMLInputElement)?.files?.[0];

  //   // this.convertFileToBase64(file as File).then((convertedFile) => {
  //   //   console.log(convertedFile)
  //   //   this.formGroup.controls['establishmentContract'].setValue(convertedFile);
  //   // })
  // }


  // convertFileToBase64(file: File) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve((<string>reader.result).split(',')[1]);
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

}
