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

  constructor(private imageService : ImagesService){}

  ngOnInit(){
    this.image = this.imageService.getFile();
    this.imageURL = URL.createObjectURL(this.image as File);
    
    console.log('img public post');
    console.log(this.image);
  }
}
