import { Component } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { PostToPublic } from '../interfaces/post-to-public';

@Component({
  selector: 'app-public-post',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './public-post.component.html',
  styleUrl: './public-post.component.css'
})
export class PublicPostComponent {
 
  image!: File | null;
  imageURL!: string;

  sharePublicly!: HTMLElement | null;
  sharePrivately!: HTMLElement | null;
  linkContainer!: HTMLElement | null;
  titleInput!: HTMLInputElement | null;
  errorBaner!: HTMLElement | null;

  sharePubliclySelected: boolean = false;
  sharePrivatelySelected: boolean = false;

  constructor(private imageService: ImagesService, private router: Router ){}

  ngOnInit(){
    this.sharePublicly = document.getElementById("ButtonPublic");
    this.sharePrivately = document.getElementById("ButtonPrivate");
    this.linkContainer = document.getElementById("Link");
    this.titleInput = document.getElementById("Title") as HTMLInputElement;
    this.errorBaner = document.getElementById("error");

    this.linkContainer!.textContent = "add proper endpoint";
    console.log(this.titleInput);
    this.image = this.imageService.getFile();
    if(this.image){
      this.imageURL = URL.createObjectURL(this.image as File);
      console.log(this.image.name, "img name0");
      this.titleInput!.value = this.image.name;
    }
    else{
      this.router.navigate(['/upload-image']);
    }
    
  }

  selectPublicMode(){
    
    this.sharePublicly!.classList.add("ButtonSelected");

    this.sharePrivately!.classList.remove("ButtonSelected");

    this.linkContainer!.textContent = "add proper endpoint!!!!!!!!!!!!!!!!!"; //todo 1. add link handling
  }

  selectPrivateMode(){
    this.sharePrivately!.classList.add("ButtonSelected");

    this.sharePublicly!.classList.remove("ButtonSelected");

    this.linkContainer!.textContent = "add proper endpoint"; //todo 1. add link handling
  }

  savePost(){
    
    this.errorBaner!.classList.remove('fade-out');
    this.errorBaner!.offsetWidth;
    
    if(this.titleInput!.value.trim() === ''){
     
      this.errorBaner?.classList.add('fade-out');
      return;
    }
    
    const postToPublic: PostToPublic = {
      title:  this.titleInput!.value.trim() as string,
      file: this.image!,
    };

    //api call post postToPublic

    this.router.navigate(['']);
  }

  copyLink(){
    navigator.clipboard.writeText(this.linkContainer!.textContent as string);
  }

}
