import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Router } from '@angular/router';
import { PostToPublic } from '../entities/post-to-public';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicPostService } from './public-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshTokenService } from  '../../authorization/refresh-token.service';
import { GetRoleService } from '../../authorization/get-role.service';
import { CollectionsService } from '../../user/collections/collections.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Collection } from '../../user/collections/collection';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule}  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

type addPostToCollectionFunctionDelegate = (postId: string, collectionId: string) => Observable<any>;
type addCollectionFunctionDelegate = (name: string) => Observable<any>;
type getUsersCollectionsFunctionDelegate = () => Observable<any>;

@Component({
  selector: 'app-public-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatListModule],
  templateUrl: './public-post.component.html',
  styleUrl: './public-post.component.css'
})
export class PublicPostComponent {
  
  private imageService = inject(ImagesService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  private publicPostService = inject(PublicPostService);
  private snackBar = inject(MatSnackBar);
  private getRoleService = inject(GetRoleService);
  private collectionService = inject(CollectionsService);
  private refreshTokenService = inject(RefreshTokenService);


  image!: File;
  imageURL!: string;
  linkToPost: string = 'Link';
  titleForm: FormGroup;
  collectionControl: FormControl = new FormControl();
  isPostPublic: boolean = true;
  collectionUUID: string | null = null;
  isUserLogged: boolean = false;
  usersCollection?: Collection[];
  noCollectionFlag: boolean = false;
  collectionFoundFlag: boolean = false; 
  
  @ViewChild('ButtonPublic', {static: true}) sharePublicly?: ElementRef;
  @ViewChild('ButtonPrivate', {static: true}) sharePrivately?: ElementRef;
  
  constructor(){
    this.titleForm = this.formBuilder.group({
      title: ['',Validators.required],
      newCollectionName: ['',],
      collections: this.collectionControl,
    });
  }

  async ngOnInit(){
    //this.titleForm.controls['newCollectionName'].setValidators(Validators.required);

    try{
      const response = await firstValueFrom(this.getRoleService.getRole());
      console.log(response.role);
      this.openSnackBar('check me');
      this.isUserLogged = true;
      if(response.role != "ANONYMOUS"){
      this.isUserLogged = true;
      }
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
    this.noCollectionFlag = false;
    this.titleForm.controls['newCollectionName'].clearValidators();
    this.titleForm.controls['newCollectionName'].updateValueAndValidity()
    this.collectionFoundFlag = false;
    this.titleForm.controls['collections'].clearValidators();
    this.titleForm.controls['collections'].updateValueAndValidity()
  }

  async selectPrivateMode(){
      
    if(!this.isUserLogged){
      this.openSnackBar('You have to log in first');
      return;
    }
    
    this.isPostPublic = false;

    //handle collection functionality
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

    this.usersCollection = [{ id: 'string',  name: 'string'},{ id: 'strinfdgg',  name: 'strinutyug'},{ id: 'strhting',  name: 'stvgbnng'},{ id: 'st+6ring',  name: 'stri6ng'},]
    //if there are no collections get name to add one 
    if(!this.usersCollection?.length){
      this.noCollectionFlag = true;
      this.titleForm.controls['newCollectionName'].setValidators(Validators.required);
      this.titleForm.controls['newCollectionName'].updateValueAndValidity()
    }
    else{
      this.collectionFoundFlag = true;
      this.titleForm.controls['collections'].setValidators(Validators.required);
      this.titleForm.controls['collections'].updateValueAndValidity()
    }
  
  }

  savePost(){
    
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