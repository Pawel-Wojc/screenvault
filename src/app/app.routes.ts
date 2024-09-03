import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { NewPostComponent } from './post/new-post/new-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ScreenVault' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'new-post',
    component: NewPostComponent,
  },
];
