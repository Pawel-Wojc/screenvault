import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Router } from '@angular/router';
import { PostToPublic } from '../entities/post-to-public';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicPostService } from './public-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshTokenService } from  '../../authorization/refresh-token.service';
import { IsLoggedService } from '../../authorization/is-logged.service';

@Component({
  selector: 'app-public-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './public-post.component.html',
  styleUrl: './public-post.component.css'
})
export class PublicPostComponent {
  private imageService = inject(ImagesService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private publicPostService = inject(PublicPostService);
  private snackBar = inject(MatSnackBar);
  private isLogged = inject(IsLoggedService);
  private refreshTokenService = inject(RefreshTokenService);

  image!: File;
  imageURL!: string;
  linkToPost: string = 'Link';
  titleForm: FormGroup;
  isPostPublic: boolean = true;
  collectionUUID: string | null = null;
  isUserLogged: boolean = false;
  
  @ViewChild('ButtonPublic', {static: true}) sharePublicly?: ElementRef;
  @ViewChild('ButtonPrivate', {static: true}) sharePrivately?: ElementRef;
  
  constructor(){
    this.titleForm = this.formBuilder.group({
      title: ['',Validators.required],
    });
  }

  ngOnInit(){

    this.isUserLogged = this.isLogged.isLogged();
    this.image = this.imageService.getFile() as File;

    if(this.image){
      this.imageURL = URL.createObjectURL(this.image as File);
      
      this.titleForm.get('title')?.setValue(this.image.name);
    }
    else{
     // this.router.navigate(['/upload-image']);
    }
  }

  selectPublicMode(){
    this.isPostPublic = true;
  }

  selectPrivateMode(){
    if(this.isUserLogged){
      this.isPostPublic = false;
    }
    else{
      this.openSnackBar('You have to log in first');
    }
  }

  savePost(){
    //handle collection functionality
    if(this.isUserLogged){
      

    }

    //create post  
    const postToPublic: PostToPublic = new PostToPublic(this.titleForm.value.title.trim(), this.isPostPublic); 

    //api call post postToPublic
    this.publicPostService.publicPost(this.image, postToPublic).subscribe({

      next: (response) => {
        this.openSnackBar(response.message);
        if (response.status == 200) {
          this.openSnackBar('Post added successfully');
          console.log(response);
        }
      },
      error: (error) => {
        this.openSnackBar("error.message");  
      }
      },
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  copyLink(){
    navigator.clipboard.writeText(this.linkToPost as string);
  }

}
