import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function minimumAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        const birthDate = new Date(control.value);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust age if the birthday hasn’t occurred yet this year
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
    }
}


export function atLeastOneFileValidator(control: AbstractControl): ValidationErrors | null {
    if (!control || typeof control !== 'object') return null;

    const hasAtLeastOne = Object.values(control.value || {}).some(value => !!value);

    return hasAtLeastOne ? null : { atLeastOneRequired: true };
}