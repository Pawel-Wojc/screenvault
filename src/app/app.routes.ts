import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { UploadImageComponent } from './add-post/upload-image/upload-image.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WallComponent } from './home/wall/wall.component';
import { CreateNewPostComponent } from './add-post/edit-image/edit-image.component';
import { PublicPostComponent } from './add-post/public-post/public-post.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { authGuardService } from './authorization/auth-guard.service';
import { CommentSectionComponent } from './home/comment-section/comment-section.component';

export const routes: Routes = [
  {
    path: '',
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
