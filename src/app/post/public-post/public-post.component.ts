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

  constructor(private imageService: ImagesService, private router: Router ){}

  ngOnInit(){
    this.image = this.imageService.getFile();
    if(this.image){
      this.imageURL = URL.createObjectURL(this.image as File);
    }
    else{
      this.router.navigate(['/new-post']);
    }
    
    
    console.log('img public post');
    console.log(this.image);
  }
}
