import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Validacionespropias {
    static comprobar(control: AbstractControl): ValidationErrors | null {

        let password = control.value;

        let hasUpperCase = /[A-Z]/.test(password);
        let hasNumber = /\d/.test(password);
        let isValidLength = password.length >= 8;

        if (!hasUpperCase || !hasNumber || !isValidLength)
            return { comprobar: true }
        else
            return null;
    }
}