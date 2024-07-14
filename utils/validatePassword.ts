import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {PasswordFormError} from "../types/passwordFormError";

export function validatePassword(
  specialCharsRegex: RegExp,
  oneUppercaseRegex: RegExp,
  oneLowercaseRegex: RegExp,
  oneDigitRegex: RegExp,
  maxOfTwoRepeatedCharsInSequnceRegex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validationErrors: PasswordFormError = {};
    const trimmedControl = control.value.trim();
    const isEnoughSpecialChars = specialCharsRegex.test(trimmedControl);
    const isThereOneUppercaseLetter = oneUppercaseRegex.test(trimmedControl);
    const isThereOneLowercaseLetter = oneLowercaseRegex.test(trimmedControl);
    const isThereOneDigit = oneDigitRegex.test(trimmedControl);
    const isLessThenTwoRepeatedCharactersInSequence = maxOfTwoRepeatedCharsInSequnceRegex.test(trimmedControl);
    if(!isLessThenTwoRepeatedCharactersInSequence) validationErrors = {...validationErrors, maxCharsInSequence: {value: trimmedControl}}
    if(!isThereOneDigit) validationErrors = {...validationErrors, oneDigit: {value: trimmedControl}}
    if(!isThereOneUppercaseLetter) validationErrors = {...validationErrors, oneUppercaseLetter: {value: trimmedControl}}
    if(!isEnoughSpecialChars) validationErrors = {...validationErrors, notEnoughSpecialChars: {value: trimmedControl}};
    if(!isThereOneLowercaseLetter) validationErrors = {...validationErrors, oneLowerCaseLetter: {value: trimmedControl}}
    if(trimmedControl.length < 6 || trimmedControl.length > 24) validationErrors = {...validationErrors, length: {value: trimmedControl}}
    return validationErrors;
  };
}
