import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { newUser } from '../interfaces/newUser';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  newUser!: newUser;
  singUpForm!: FormGroup;
  passwordInvalid = false;

  constructor(private formBuilder: FormBuilder) {
    this.singUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email /*pattern(/^[\w]+@([\w-]+\.)+[\w]{2,4}$/)*/,
        ],
      ],
      password1: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
          ),
        ],
      ],
      password2: ['', [Validators.required /*this.validatePassword*/]],
    });
  }

  submitSingUpForm() {
    if (this.singUpForm.value.password1 === this.singUpForm.value.password2) {
      this.passwordInvalid = false;

      this.newUser.email = this.singUpForm.value.email;
      this.newUser.userName = this.singUpForm.value.userName;
      this.newUser.password = this.singUpForm.value.password;

      console.log(this.singUpForm.value);
    } else {
      this.passwordInvalid = true;
    }
  }
}
