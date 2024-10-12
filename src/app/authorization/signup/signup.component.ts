import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
  passwordValid = true;

  constructor(private formBuilder: FormBuilder) {
    this.singUpForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email /*pattern(/^[\w]+@([\w-]+\.)+[\w]{2,4}$/)*/]],
        password: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator, // Applying custom validator
      }
    );
  }

  // Custom Validator
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  submitSingUpForm() {
    this.newUser.email = this.singUpForm.value.email;
    this.newUser.userName = this.singUpForm.value.userName;
    this.newUser.password = this.singUpForm.value.password;
    console.log(this.singUpForm.value);
  }

  checkPasswordMatch() {
    if (this.singUpForm.value.password != this.singUpForm.value.confirmPassword) {
      this.passwordValid = false;
    }
  }
}
