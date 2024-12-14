import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ImagesService } from '../images.service';
import { Router } from '@angular/router';
import { PostToPublic } from '../post-to-public';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicPostService } from './public-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetRoleService } from '../../authorization/get-role.service';
import { CollectionsService } from '../../user/collections/collections.service';
import { firstValueFrom } from 'rxjs';
import { Collection } from '../../user/collections/collection';
import { MatInputModule}  from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { HttpParams } from '@angular/common/http';
import { GetUsersCollectionsResposeEntity } from '../../user/collections/getUsersCollectionsResposeEntity';
import * as Globals from '../../global';

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
  
  image!: File;
  imageURL?: string;
  linkToPost?: string = 'Link';
  postForm: FormGroup;
  isPostPublic: boolean = true;
  collectionUUID: string | null = null;
  isUserLogged: boolean = false;
  noCollectionFlag: boolean = false;
  collectionFoundFlag: boolean = false; 
  postedPostUUID?: string;
  selectedCollectionUUID?: string;
  postSubmitted: boolean = false;

  usersCollections?: Collection[];
  pictureTags?: string[];
  collectionControl: FormControl = new FormControl();
  tagControl: FormControl = new FormControl();
  
  @ViewChild('ButtonPublic', {static: true}) sharePublicly?: ElementRef;
  @ViewChild('ButtonPrivate', {static: true}) sharePrivately?: ElementRef;
  
  constructor(){
    this.postForm = this.formBuilder.group({
      title: ['',Validators.required],
      newCollectionName: ['',],
      collections: this.collectionControl,
      tags: this.tagControl,
    });
  }

  async ngOnInit(){

    this.image = this.imageService.getFile() as File;

    if(!this.image){
      this.router.navigate(['/upload-image']);
    }

    this.isUserLogged = await this.getRoleService.ifUserLogged();

    //handle collection functionality
    if(this.isUserLogged){
      this.handleCollections();
    }
    
    this.imageURL = URL.createObjectURL(this.image as File);
      
    this.postForm.get('title')?.setValue(this.image.name);
    

    this.pictureTags = await firstValueFrom(this.imageService.getTags());

    this.pictureTags = ["#tag1", "#tag2","#dfg","#qqqq","#pop","#lol"];

  //  console.log(this.pictureTags);
   
  }

  selectPublicMode(){
      this.isPostPublic = true;
  }

  async selectPrivateMode(){

    if(!this.isUserLogged){
      this.openSnackBar('You have to log in first');
      return;
    }

    this.isPostPublic = false;
  }

  async handleCollections(){

    //reset flags
    this.noCollectionFlag = false;
    this.postForm.controls['newCollectionName'].clearValidators();
    this.postForm.controls['newCollectionName'].updateValueAndValidity()

    this.collectionFoundFlag = false;
    this.postForm.controls['collections'].clearValidators();
    this.postForm.controls['collections'].updateValueAndValidity()

    //get users collections ->

    try{
      const getUsersCollectionsResponse: GetUsersCollectionsResposeEntity  = await firstValueFrom(this.collectionService.getUsersCollections());
     
      this.usersCollections = getUsersCollectionsResponse.collectionList;
    }
    catch(err: any){}
    //get users collections <-

    //if there are no collections get name to add one 
    if(!this.usersCollections?.length){
      this.noCollectionFlag = true;
      this.postForm.controls['newCollectionName'].setValidators(Validators.required);
      this.postForm.controls['newCollectionName'].updateValueAndValidity()
    }
    else{
      this.collectionFoundFlag = true;
      this.postForm.controls['collections'].setValidators(Validators.required);
      this.postForm.controls['collections'].updateValueAndValidity()
    }
  }

  async savePost(){
    this.postSubmitted = true;
   // console.log(this.postForm.value.tags);
    //create post  
    const postToPublic: PostToPublic = new PostToPublic(
      this.postForm.value.title.trim(), 
      this.postForm.value.tags,
      this.isPostPublic
    ); 

    console.log(postToPublic);
    //api call post postToPublic
    try{
      const publicPostResponse = await firstValueFrom(this.publicPostService.publicPost(this.image, postToPublic));
      if (publicPostResponse.success) {
        this.openSnackBar('Post added successfully');
        this.postedPostUUID = publicPostResponse.post.id;

        const params = new HttpParams().set('id', this.postedPostUUID as string);

        this.linkToPost = Globals.frontLink + '/commentSection;' + params.toString();
         
      }
    }
    catch(err: any){
      this.openSnackBar('Please try again later'); 
    }

    //if user not logged end function
    if(!this.isUserLogged){
      return;
    }

    if(this.noCollectionFlag){
      //create new collection
      try{
        const addCollectionResponse = await firstValueFrom(this.collectionService.addCollection(this.postForm.value.newCollectionName.trim()));

        if (addCollectionResponse.success) {
          this.selectedCollectionUUID = addCollectionResponse.collection.id;
        }
      }
      catch(err: any){
        this.openSnackBar(err.message); 
      }
      
    }
    else if(this.collectionFoundFlag){
      this.selectedCollectionUUID = this.postForm.value.collections[0];
    }

    //add post to collection
    try{
      const addPostToCollectionResponse = await firstValueFrom(this.collectionService.addPostToCollection(this.postedPostUUID as string, this.selectedCollectionUUID as string));
    }
    catch(err: any){
      this.openSnackBar(err.message); 
    }
  
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
    this.openSnackBar('Copied');
  }

}