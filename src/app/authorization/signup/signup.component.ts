import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { newUser } from '../interfaces/newUser';
import { SignupService } from './signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private registerService = inject(SignupService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  newUser: newUser = {
    userName: '',
    email: '',
    password: '',
  };
  singUpForm!: FormGroup;
  passwordValid = true;

  constructor(private formBuilder: FormBuilder) {
    this.singUpForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email /*pattern(/^[\w]+@([\w-]+\.)+[\w]{2,4}$/)*/,
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
            ),
          ],
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
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }
  checkPasswordMatch() {
    if (
      this.singUpForm.value.password != this.singUpForm.value.confirmPassword
    ) {
      this.passwordValid = false;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  submitSingUpForm() {
    this.newUser.email = this.singUpForm.value.email;
    this.newUser.userName = this.singUpForm.value.userName;
    this.newUser.password = this.singUpForm.value.password;
    this.registerService.registerUser(this.newUser).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.openSnackBar('User created successfully');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      error: (error) => {
        if (error.error.errors.DuplicateUserName) {
          this.openSnackBar('Email already exists');
        } else {
          this.openSnackBar('Something went wrong, try again later');
        }
      },
    });
  }
}
