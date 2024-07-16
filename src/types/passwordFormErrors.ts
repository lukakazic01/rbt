export interface PasswordFormErrors {
  maxCharsInSequence?: ControlValue,
  oneDigit?: ControlValue,
  oneUppercaseLetter?: ControlValue,
  notEnoughSpecialChars? :ControlValue,
  oneLowerCaseLetter?: ControlValue,
  length?: ControlValue
}

interface ControlValue {
  value: string
}
