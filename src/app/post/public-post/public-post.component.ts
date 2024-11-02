import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { PostToPublic } from '../interfaces/post-to-public';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-public-post',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './public-post.component.html',
  styleUrl: './public-post.component.css'
})
export class PublicPostComponent {
  private imageService = inject(ImagesService)
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)
  
  image!: File | null;
  imageURL!: string;
  linkToPost?: string;
  titleForm: FormGroup;

  @ViewChild('ButtonPublic', {static: true}) sharePublicly?: ElementRef;
  @ViewChild('ButtonPrivate', {static: true}) sharePrivately?: ElementRef;
  
  sharePubliclySelected: boolean = false;
  sharePrivatelySelected: boolean = false;

  constructor(){
    this.titleForm = this.formBuilder.group({
      title: ['',Validators.required],
    });
  }

  ngOnInit(){
    this.linkToPost = "add proper endpoint"; //add endpoint to private 
    
    this.image = this.imageService.getFile();
    if(this.image){
      this.imageURL = URL.createObjectURL(this.image as File);
      
      this.titleForm.get('title')?.setValue(this.image.name);
    }
    else{
      this.router.navigate(['/upload-image']);
    }
    
  }

  selectPublicMode(){
    
    this.sharePublicly?.nativeElement.classList.add("ButtonSelected");

    this.sharePrivately?.nativeElement.classList.remove("ButtonSelected");

    this.linkToPost = "add proper endpoint!!!!!!!!!!!!!!!!!"; //todo 1. add link handling
  }

  selectPrivateMode(){
    this.sharePrivately?.nativeElement.classList.add("ButtonSelected");

    this.sharePublicly?.nativeElement.classList.remove("ButtonSelected");

    this.linkToPost = "add proper endpoint"; //todo 1. add link handling
  }

  savePost(){
        
    const postToPublic: PostToPublic = {
      title:  this.titleForm.value.title.trim() as string,
      file: this.image!,
    };

    //api call post postToPublic

    this.router.navigate(['']);
  }

  copyLink(){
    navigator.clipboard.writeText(this.linkToPost as string);
  }

}
