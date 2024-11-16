import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Router } from '@angular/router';
import { PostToPublic } from '../interfaces/post-to-public';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicPostService } from './public-post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  image!: File | null;
  imageURL!: string;
  linkToPost?: string;
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
    this.linkToPost = "add proper endpoint!!!!!!!!!!!!!!!!!"; 
    this.image = this.imageService.getFile();
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
    this.isPostPublic = false;
  }

  savePost(){
      
    const postToPublic: PostToPublic = {
      title:  this.titleForm.value.title.trim() as string,
      file: this.image!,
    };

    //api call post postToPublic
    this.publicPostService.publicPost("My man i would love to know").subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.openSnackBar('Post added successfully');
          
        }
      },
      error: (error) => {
        
          this.openSnackBar('I lack implementation');
       // alert('I lack implementation');
      },
    });

    setTimeout(() => {
      this.router.navigate(['']);
    }, 2000);
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
