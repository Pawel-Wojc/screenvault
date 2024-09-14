import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagesService } from '../../services/images.service';
 
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink,],
  providers: [ImagesService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  constructor(private imgService : ImagesService){
    
  }

}
