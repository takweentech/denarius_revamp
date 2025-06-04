import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../../../core/base/base.component';
import { UpgradeService } from '../../../../../../../data/upgrade.service';
import { takeUntil, } from 'rxjs';
import { ToastService } from '../../../../../../../shared/components/toast/toast.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { atLeastOneFileValidator } from '../../../../../../../core/validators/form.validators';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent extends BaseComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly upgradeService = inject(UpgradeService);
  private readonly translateService = inject(TranslateService);
  private toastService = inject(ToastService);

  activeModal = inject(NgbActiveModal);
  loading = signal<boolean>(false);
  form!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    this.form = this.fb.group({
      files: this.fb.group({
        TradingActivityProofFilePath: [null],
        NetAssetsProofFilePath: [null],
        ProfessionalCertificationFilePath: [null],
        FinancialExperienceProofFilePath: [null],
        IncomeAndCME1ProofFilePath: [null],
      }, { validators: atLeastOneFileValidator }),
      Note: [null, Validators.required],
    })
  }

  onUploadFile(event: Event, formControName: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    (this.form.controls['files'] as FormGroup)?.get(formControName)?.setValue(file);
  }

  onSave(): void {
    if (this.form.valid) {
      this.loading.set(true);
      this.create();
    } else {
      this.form.markAllAsTouched();
    }
  }


  create(): void {
    const formattedValue: any = {
      Note: this.form.value.Note,
      TradingActivityProofFilePath: this.form.value.files?.TradingActivityProofFilePath,
      NetAssetsProofFilePath: this.form.value.files?.NetAssetsProofFilePath,
      ProfessionalCertificationFilePath: this.form.value.files?.ProfessionalCertificationFilePath,
      FinancialExperienceProofFilePath: this.form.value.files?.FinancialExperienceProofFilePath,
      IncomeAndCME1ProofFilePath: this.form.value.files?.IncomeAndCME1ProofFilePath,
    };

    Object.keys(formattedValue).forEach(key => {
      !formattedValue[key] && delete formattedValue[key]
    });

    const formData = new FormData();
    Object.keys(formattedValue).forEach(key => {
      formData.append(key, formattedValue[key])
    })
    this.upgradeService.create(formData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.status == 200 || response.status == 201) {
          this.toastService.show({ text: this.translateService.instant('SETTINGS.UPGRADE.FORM.SUCCESS_MSG'), classname: 'bg-success text-light', icon: 'fa-circle-check' });
          this.activeModal.close('success');
          this.form.reset()
        } else {
          this.toastService.show({ text: response.message, classname: 'bg-danger text-light', icon: 'fa-circle-exclamation' });
        }
      },
      error: (error) => {
        this.toastService.show({ text: error.message, classname: 'bg-danger text-light', icon: 'fa-circle-exclamation' });
      }
    })
  }


}
