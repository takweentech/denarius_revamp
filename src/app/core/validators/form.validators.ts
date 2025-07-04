import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimumAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    let birthDate: Date;

    // Expecting value like: "1445-10-01"
    const value = control.value.toString();
    const isHijri = /^\d{4}-\d{1,2}-\d{1,2}$/.test(value) && value.startsWith('14');

    if (isHijri) {
      // Parse Hijri parts
      const [hYearStr, hMonthStr, hDayStr] = value.split('-');
      const hijriYear = Number(hYearStr);
      const hijriMonth = Number(hMonthStr);
      const hijriDay = Number(hDayStr);

      // Rough Hijri → Gregorian conversion: Hijri ≈ Gregorian - 579
      const approxGregorianYear = hijriYear + 579;

      birthDate = new Date(approxGregorianYear, hijriMonth - 1, hijriDay + 10);
    } else {
      // Fallback: treat as normal Gregorian
      birthDate = new Date(value);
    }

    if (isNaN(birthDate.getTime())) {
      return { invalidDate: true };
    }

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= minAge ? null : { minimumAge: { requiredAge: minAge, actualAge: age } };
  };
}

export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (abstractControl: AbstractControl) => {
    const control = abstractControl.get(controlName);
    const matchingControl = abstractControl.get(matchingControlName);

    if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
      return null;
    }

    if (control!.value !== matchingControl!.value) {
      const error = { confirmedValidator: 'Passwords do not match.' };
      matchingControl!.setErrors(error);
      return error;
    } else {
      matchingControl!.setErrors(null);
      return null;
    }
  };
}

export function atLeastOneFileValidator(control: AbstractControl): ValidationErrors | null {
  if (!control || typeof control !== 'object') return null;

  const hasAtLeastOne = Object.values(control.value || {}).some(value => !!value);

  return hasAtLeastOne ? null : { atLeastOneRequired: true };
}
