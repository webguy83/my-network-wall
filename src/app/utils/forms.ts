import { FormGroup } from '@angular/forms';

export class FormHelpers {
  constructor(private formGroup: FormGroup) {}

  isFormControlInvalid(formControl: string) {
    return this.formGroup.controls[formControl].invalid;
  }

  getErrorMessage(formControl: string) {
    if (this.formGroup.controls[formControl].hasError('required')) {
      return `${formControl.replace(/^\w/, (char) =>
        char.toUpperCase()
      )} is required.`;
    }
    return `Please enter a valid ${formControl}.`;
  }
}
