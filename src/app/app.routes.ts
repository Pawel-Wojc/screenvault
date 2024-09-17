import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post/post.component';
import { CreateNewPostComponent } from './post/create-new-post/create-new-post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ScreenVault' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'new-post',
    component: NewPostComponent,
  },

  {
    path: 'post',
    component: PostComponent,
  },
  {
    path: 'create-new-post',
    component: CreateNewPostComponent,
  },
  {
    path: '**',
    title: '404 - Not found',
    component: NotFoundComponent,
  },
];
