import { Component } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  //for css use
  dragging = false;

  constructor(
    private router: Router,
    private imgService: ImagesService,
  ) {}

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
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.handleFiles(target.files);
    }
  }

  //handles submited files
  handleFiles(files: FileList) {
    //check extension
    //check size
    //save file to LocalStorage?? Issue: file disappear after refresh
    //this.fileTransfer.setFile(files[0]);
    this.imgService.setFile(files[0]);
    // this.router.navigate(['/','post']); //ja bym tu przekierowac do nowego componentu, create-new-post, post to bardziej juz do wyswietlenia samego postu
    this.router.navigate(['/create-new-post']);
  }
}
