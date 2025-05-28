import { AbstractControl, ValidationErrors } from "@angular/forms";



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