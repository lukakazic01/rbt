import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {PasswordFormErrors} from "../types/PasswordFormErrors";

export function validatePassword(
  specialCharsRegex: RegExp,
  oneUppercaseRegex: RegExp,
  oneLowercaseRegex: RegExp,
  oneDigitRegex: RegExp,
  maxOfTwoRepeatedCharsInSequnceRegex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const trimmedControl = control.value.trim();
    const validationErrors: PasswordFormErrors = {
      ...(trimmedControl.length < 6 || trimmedControl.length > 24 ? { length: { message: 'Password must be between 6 and 24 characters' } } : {}),
      ...(!specialCharsRegex.test(trimmedControl) ? { notEnoughSpecialChars: { message: 'You must have at least 2 special characters' } } : {}),
      ...(!oneUppercaseRegex.test(trimmedControl) ? { oneUppercaseLetter: { message: 'You must have at least one uppercase letter' } } : {}),
      ...(!oneLowercaseRegex.test(trimmedControl) ? { oneLowerCaseLetter: { message: 'You must have at least one lowercase letter' } } : {}),
      ...(!oneDigitRegex.test(trimmedControl) ? { oneDigit: { message: 'You must have at least one digit' } } : {}),
      ...(!maxOfTwoRepeatedCharsInSequnceRegex.test(trimmedControl) ? { maxCharsInSequence: { message: 'Only 2 same characters in sequence allowed' } } : {})
    };
    return Object.keys(validationErrors).length ? validationErrors : null;
  };
}
