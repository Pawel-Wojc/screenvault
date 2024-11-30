import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Router } from '@angular/router';
import { PostToPublic } from '../entities/post-to-public';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicPostService } from './public-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RefreshTokenService } from  '../../authorization/refresh-token.service';
import { PublicPostPayload } from '../entities/public-post-payload';

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
  private refreshTokenService = inject(RefreshTokenService);

  image!: File;
  imageURL!: string;
  linkToPost: string = 'Link';
  titleForm: FormGroup;
  isPostPublic: boolean = true;
  
  @ViewChild('ButtonPublic', {static: true}) sharePublicly?: ElementRef;
  @ViewChild('ButtonPrivate', {static: true}) sharePrivately?: ElementRef;
  
  constructor(){
    this.titleForm = this.formBuilder.group({
      title: ['',Validators.required],
    });
  }

  ngOnInit(){

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
    alert('add check if loged in!~!!!!');
    this.isPostPublic = false;
  }

  savePost(){
    console.log(this.image); 
    //create post  
    const postToPublic: PostToPublic = new PostToPublic(this.titleForm.value.title.trim());
     
    console.log(postToPublic);

    //create request payload
    const publicPostRequestPayload: PublicPostPayload = new PublicPostPayload(postToPublic, this.isPostPublic);
   

    //api call post postToPublic
    this.publicPostService.publicPost(this.image, publicPostRequestPayload).subscribe({

      next: (response) => {
        this.openSnackBar(response.message);
        if (response.status == 200) {
          this.openSnackBar('Post added successfully');
        }
      },
      error: (error) => {

        this.openSnackBar(error.message);
             
      }
          
       // alert('I lack implementation');
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
