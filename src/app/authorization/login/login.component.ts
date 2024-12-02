import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { GetRoleService } from '../../authorization/get-role.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('errorBaner', { static: true }) errorBaner?: ElementRef;
  private getRoleService = inject(GetRoleService);
  logInForm!: FormGroup;
  credentials!: string;
  credentialsBase64!: string;

  private loginService = inject(LoginService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

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

  async submitLogIn() {
    this.credentials =
      this.logInForm.value.email + ':' + this.logInForm.value.password;
    this.credentialsBase64 = btoa(
      String.fromCharCode(...new TextEncoder().encode(this.credentials))
    );

    this.loginService.loginUser(this.credentialsBase64).subscribe({
      next: async (response) => {
        if (response.status == 200) {
          this.authService.login();
          /*
          console.log(response);
          try{
            const response = await firstValueFrom(this.getRoleService.getRole());
            console.log(response);
            this.openSnackBar('check me');
           // this.isUserLogged = true;
            if(response.role != "ANONYMOUS"){
           // this.isUserLogged = true;
            }
          }
          catch (err){
           // this.isUserLogged = false;
          }
          */
          this.openSnackBar('Login successfull');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      },
      error: (error: string) => {
        this.errorBaner?.nativeElement.classList.add('removeOpacity');
        console.log(error);
      },
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
