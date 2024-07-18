import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {PasswordFormErrors} from "../types/PasswordFormErrors";

export function validatePassword(
  specialCharsRegex: RegExp,
  oneUppercaseRegex: RegExp,
  oneLowercaseRegex: RegExp,
  oneDigitRegex: RegExp,
  maxOfTwoRepeatedCharsInSequnceRegex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validationErrors: PasswordFormErrors = {};
    const trimmedControl = control.value.trim();
    const isEnoughSpecialChars = specialCharsRegex.test(trimmedControl);
    const isThereOneUppercaseLetter = oneUppercaseRegex.test(trimmedControl);
    const isThereOneLowercaseLetter = oneLowercaseRegex.test(trimmedControl);
    const isThereOneDigit = oneDigitRegex.test(trimmedControl);
    const isLessThenTwoRepeatedCharactersInSequence = maxOfTwoRepeatedCharsInSequnceRegex.test(trimmedControl);
    if(!isLessThenTwoRepeatedCharactersInSequence) validationErrors = {...validationErrors, maxCharsInSequence: {message: 'Only 2 same characters in sequence allowed'}}
    if(!isThereOneDigit) validationErrors = {...validationErrors, oneDigit: {message: 'You must have at least one digit'}}
    if(!isThereOneUppercaseLetter) validationErrors = {...validationErrors, oneUppercaseLetter: {message: 'You must have at least one uppercase letter'}}
    if(!isEnoughSpecialChars) validationErrors = {...validationErrors, notEnoughSpecialChars: {message: 'You must have at least 2 special characters'}};
    if(!isThereOneLowercaseLetter) validationErrors = {...validationErrors, oneLowerCaseLetter: {message: 'You must have at least one lowercase letter'}}
    if(trimmedControl.length < 6 || trimmedControl.length > 24) validationErrors = {...validationErrors, length: {message: 'Password must be between 6 and 24 characters'}}
    return validationErrors;
  };
}
