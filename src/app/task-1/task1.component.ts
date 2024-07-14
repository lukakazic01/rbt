import {Component} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {validatePassword} from "../../../utils/validatePassword";
import {
  REGEX_FOR_AT_LEAST_1_DIGIT,
  REGEX_FOR_AT_LEAST_1_LOWERCASE_LETTER,
  REGEX_FOR_AT_LEAST_1_UPPERCASE_LETTER,
  REGEX_FOR_AT_LEAST_2_SPECIAL_CHARS, REGEX_FOR_MAX_2_REPEATED_CHARS_IN_SEQUENCE
} from "../../../constants";


@Component({
  standalone: true,
  styleUrl: './task1.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task1.component.html',
  selector: 'app-task1'
})

export class Task1Component {
  passwordForm = this.formBuilder.group({
    password: ['', validatePassword(
      REGEX_FOR_AT_LEAST_2_SPECIAL_CHARS,
      REGEX_FOR_AT_LEAST_1_UPPERCASE_LETTER,
      REGEX_FOR_AT_LEAST_1_LOWERCASE_LETTER,
      REGEX_FOR_AT_LEAST_1_DIGIT,
      REGEX_FOR_MAX_2_REPEATED_CHARS_IN_SEQUENCE
    )]
  })

  constructor(private formBuilder: FormBuilder) { }

  public get password() {
    return this.passwordForm.get('password');
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    console.log(this.password?.errors);
  }
}
