export interface PasswordFormError {
  maxCharsInSequence?: string,
  oneDigit?: string,
  oneUppercaseLetter?: string,
  notEnoughSpecialChars? :string,
  oneLowerCaseLetter?: string,
  length?: string
}
