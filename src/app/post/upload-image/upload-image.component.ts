import { Component, ElementRef, ViewChild, Inject, inject } from '@angular/core';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
})
export class UploadImageComponent {
  //for css use
  dragging = false;
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private imgService = inject(ImagesService)
  
  @ViewChild('error', {static: true}) errorBaner?: ElementRef; 

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
    

    if(this.imgService.validateFile(files[0])){
      this.imgService.setFile(files[0]);
      this.router.navigate(['/create-new-post']);
    }
    else{
      this.snackBar.open('Max file size is 10 MB. Available extensions are: jpg, jpeg, svg, png, webp','', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
     this.errorBaner?.nativeElement.classList.remove('fade-out');
     this.errorBaner?.nativeElement.offsetWidth;
     this.errorBaner?.nativeElement.classList.add('fade-out');
      
    }
    
  }
}
