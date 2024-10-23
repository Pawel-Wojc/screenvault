import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { logInUser } from '../interfaces/logInUser';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  wrongCredentials = signal(false);
  checkPassword() {
    throw new Error('Method not implemented.');
  }
  logInForm!: FormGroup;
  logInUser!: logInUser;

  private loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit() {
    // Check if the user is already logged in
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }
  constructor(private formBuilder: FormBuilder) {
    this.logInForm = this.formBuilder.group({
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
    });
  }

  submitLogIn() {
    this.logInUser = {
      email: this.logInForm.value.email,
      password: this.logInForm.value.password,
    };
    this.loginService.loginUser(this.logInUser).subscribe(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
    this.logInUser = {
      email: '',
      password: '',
    };
  }
}
