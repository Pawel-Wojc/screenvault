import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { UploadImageComponent } from './add-post/upload-image/upload-image.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateAnonymousPostComponent } from './add-post/anonymous-post/create-anonymous-post/create-anonymous-post.component';
import { WallComponent } from './home/wall/wall.component';
import { CreateNewPostComponent } from './add-post/edit-image/edit-image.component';
import { PublicPostComponent } from './add-post/public-post/public-post.component';
import { GetAnonymousPostComponent } from './add-post/anonymous-post/get-anonymous-post/get-anonymous-post.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { authGuardService } from './authorization/auth-guard.service';
import { CommentSectionComponent } from './home/comment-section/comment-section.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    title: 'ScreenVault',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'ScreenVault',
    children: [
      {
        path: '',
        component: WallComponent,
      },
      {
        path: 'commentSection',
        component: CommentSectionComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'upload-image',
    component: UploadImageComponent,
  },
  {
    path: 'create-new-post',
    component: CreateNewPostComponent,
  },
  {
    path: 'public-post',
    component: PublicPostComponent,
  },
  {
    path: 'create-anonymous-post',
    component: CreateAnonymousPostComponent,
  },
  {
    path: 'a/:linkId',
    component: GetAnonymousPostComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [authGuardService],
  },

  {
    path: '**',
    title: '404 - Not found',
    component: NotFoundComponent,
  },
];
