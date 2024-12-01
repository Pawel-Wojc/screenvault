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
import { CollectionsService } from '../../user/collections/collections.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Collection } from '../../user/collections/collection';
import { HttpErrorResponse } from '@angular/common/http';

type addPostToCollectionFunctionDelegate = (postId: string, collectionId: string) => Observable<any>;
type addCollectionFunctionDelegate = (name: string) => Observable<any>;
type getUsersCollectionsFunctionDelegate = () => Observable<any>;

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
  private collectionService = inject(CollectionsService);
  private refreshTokenService = inject(RefreshTokenService);


  image!: File;
  imageURL!: string;
  linkToPost: string = 'Link';
  titleForm: FormGroup;
  isPostPublic: boolean = true;
  collectionUUID: string | null = null;
  isUserLogged: boolean = false;
  usersCollection?: Collection[];
  
  @ViewChild('ButtonPublic', {static: true}) sharePublicly?: ElementRef;
  @ViewChild('ButtonPrivate', {static: true}) sharePrivately?: ElementRef;
  
  constructor(){
    this.titleForm = this.formBuilder.group({
      title: ['',Validators.required],
    });
  }

  async ngOnInit(){
    try{
      const response = await firstValueFrom(this.isLogged.isLogged());

      this.isUserLogged = true;
    }
    catch (err){
      this.isUserLogged = false;
    }
    
    console.log(this.isUserLogged);

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

  async savePost(){
    //handle collection functionality
    if(this.isUserLogged){

      //get users collections ->
      try{
        const getUsersCollectionsResponse = await firstValueFrom(this.collectionService.getUsersCollections());

        if (getUsersCollectionsResponse.status == 200) {
          this.openSnackBar('check me');
          console.log(getUsersCollectionsResponse);
          this.usersCollection = getUsersCollectionsResponse;
        }
      }
      catch(err: any){
        if (err.status == 403){
          
          try{
            const tokenRespose = await firstValueFrom(this.refreshTokenService.refreshToken());
            
            if (tokenRespose.status == 200) {

              try{
                const getUsersCollectionsResponse = await firstValueFrom(this.collectionService.getUsersCollections());

                if (getUsersCollectionsResponse.status == 200) {
                  this.openSnackBar('check me');
                  console.log(getUsersCollectionsResponse);
                  this.usersCollection = getUsersCollectionsResponse;
                }
              }
              catch(err: any){
                this.openSnackBar(err.statusText);
              }
              
            } 
          }
          catch(err: any){
            this.openSnackBar(err.statusText);
          }  
        }
      }
      //get users collections <-

      if(this.usersCollection?.length){

      }

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


  // Single implementation
  refreshToken1(name: string, funcToDoWhenRefreshed: addCollectionFunctionDelegate){
    this.refreshTokenService.refreshToken().subscribe({
      next: (response) => {
        if (response.status == 200) {

          funcToDoWhenRefreshed(name).subscribe({
            next: (response) => {
              if (response.status == 200) {
                this.openSnackBar('Action completed');
              }
            },
            error: (error) => {
              this.openSnackBar(error.statusText);
            }, 
          });
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
    });
  }

  refreshToken(postId: string, collectionId: string, funcToDoWhenRefreshed: addPostToCollectionFunctionDelegate){
    this.refreshTokenService.refreshToken().subscribe({
      next: (response) => {
        if (response.status == 200) {

          funcToDoWhenRefreshed(postId, collectionId).subscribe({
            next: (response) => {
              if (response.status == 200) {
                this.openSnackBar('Action completed');
              }
            },
            error: (error) => {
              this.openSnackBar(error.statusText);
            }, 
          });
        }
      },
      error: (error) => {
        this.openSnackBar(error.statusText);
      },
    });
  }

}