import { Component, OnInit } from '@angular/core';
import { FileTransferService } from '../file-transport.service/file-transfer.service';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../services/images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.css',
})
export class CreateNewPostComponent implements OnInit {
  file: File | null = null;
  imageUrl: string | null = null; // URL to display the image

  constructor(
    private router: Router,
    private fileTransferService: FileTransferService
  ) {}

  ngOnInit() {
    // Retrieve the file from the service
    this.file = this.fileTransferService.getFile();

    if (this.file) {
      // Generate a URL for the image file to display it in the template
      this.imageUrl = URL.createObjectURL(this.file);
    } else {
      this.router.navigate(['/new-post']);
    }

    // Optionally clear the file from the service after usage
    //this.fileTransferService.clearFile();
  }

  // Cleanup the URL object when component is destroyed to prevent memory leaks
  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
}
