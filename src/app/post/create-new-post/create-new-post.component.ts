import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagesService } from '../../services/images.service';


@Component({
  selector: 'app-create-new-post',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.css'
})
export class CreateNewPostComponent {
  //file that wil be edited
  file: File | null = null;
  fileUrl!: string; 
  
  constructor(public imgService : ImagesService){}

  ngOnInit(){
    this. file = this.imgService.getFileToEdit();
    if(this.file){
      
    this.fileUrl= URL.createObjectURL(this.file as File);
    }
  }
}
