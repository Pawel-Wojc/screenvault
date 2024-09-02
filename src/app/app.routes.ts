import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'screenvault' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
