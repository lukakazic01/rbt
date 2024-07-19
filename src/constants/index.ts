export const REGEX_FOR_AT_LEAST_2_SPECIAL_CHARS = /^(?=(.*[\p{P}\p{S}]){2,}).*$/u;
export const REGEX_FOR_AT_LEAST_1_UPPERCASE_LETTER = /^(?=.*[A-Z]).*$/;
export const REGEX_FOR_AT_LEAST_1_LOWERCASE_LETTER = /^(?=.*[a-z]).*$/;
export const REGEX_FOR_AT_LEAST_1_DIGIT = /^(?=.*\d).*$/;
export const REGEX_FOR_MAX_2_REPEATED_CHARS_IN_SEQUENCE = /^(?!.*(.)\1{2}).*$/;
