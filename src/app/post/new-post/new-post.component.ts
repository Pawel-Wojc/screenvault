import { Component } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  //for css use
  dragging = false;

 constructor(private router: Router, private imgService : ImagesService ){

 }

  // Enter drop zone event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  // Leave drop zone event
  onDragLeave(event: DragEvent) {
    this.dragging = false;
  }

  // Drop file event
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  // action when file selected manualy
  onFileSelected(event: Event){
    const target = event.target as HTMLInputElement;
    if(target.files){
      this.handleFiles(target.files);
    }
  }

  //handles submited files
  handleFiles(files: FileList){
    this.imgService.subFiles(files);;
    this.router.navigate(['/','post']);
  }
}
