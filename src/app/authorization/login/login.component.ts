import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { logInUser } from '../../interfaces/logInUser'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logInForm!: FormGroup;
  logInUser!: logInUser;

  constructor(private formBuilder: FormBuilder){
    this.logInForm= this.formBuilder.group({
      email: ['', [Validators.required,Validators.email /*pattern(/^[\w]+@([\w-]+\.)+[\w]{2,4}$/)*/]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)]],
    })
  }

  submitLogIn(){
    this.logInUser.email = this.logInForm.value.email;
    this.logInUser.password = this.logInForm.value.password;
  }
}
