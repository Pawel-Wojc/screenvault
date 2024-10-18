import { Component } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

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

  sharePubliclySelected: boolean = false;
  sharePrivatelySelected: boolean = false;

  constructor(private imageService: ImagesService, private router: Router ){}

  ngOnInit(){
    this.sharePublicly = document.getElementById("ButtonPublic");
   
    this.sharePrivately = document.getElementById("ButtonPrivate");

    this.image = this.imageService.getFile();
    if(this.image){
      this.imageURL = URL.createObjectURL(this.image as File);
    }
    else{
     // this.router.navigate(['/upload-image']);
    }
    
  }

  selectPublicMode(){
    
    this.sharePublicly!.classList.add("ButtonSelected");

    this.sharePrivately!.classList.remove("ButtonSelected");

    //todo 1. add link handling
  }

  selectPrivateMode(){
    this.sharePrivately!.classList.add("ButtonSelected");

    this.sharePublicly!.classList.remove("ButtonSelected");

    //todo 1. add link handling
  }
}
