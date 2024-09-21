import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { getEditorDefaults } from '@pqina/pintura';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  //file that wil be edited
  file: File | null = null;
  fileUrl!: string;
  //pintura 
 
  
  constructor(public imgService : ImagesService, private sanitizer: DomSanitizer){}

  ngOnInit(){
    this. file = this.imgService.getFileToEdit();
    if(this.file){
      
    this.fileUrl= URL.createObjectURL(this.file as File);
    }
  }

}
