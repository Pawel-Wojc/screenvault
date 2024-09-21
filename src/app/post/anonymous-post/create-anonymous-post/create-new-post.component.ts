import { Component, OnInit } from '@angular/core';
import { FileTransferService } from '../../file-transport.service/file-transfer.service';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../../services/images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateAnonymousPostService } from './create-anonymous-post.service';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-create-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ClipboardModule],
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.css',
})
export class CreateNewPostComponent implements OnInit {
  file: File | null = null;
  title: string = '';
  imageUrl: string | undefined = undefined;
  urlObject = new URL(window.location.href);
  imageToShareUrl: string =
    this.urlObject.origin.replace(/^https?:\/\//, '') + '/'; // URL to display the image

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fileTransferService: FileTransferService,
    private createAnonymousPostService: CreateAnonymousPostService
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
  onPublish() {
    console.log(this.title);
    if (this.file) {
      this.createAnonymousPostService
        .createAnonymousPost(this.file, this.title)
        .subscribe({
          next: (res: any) => {
            this.imageToShareUrl += res.linkId;
            console.log(this.imageToShareUrl);
          },
        });
    }
  }

  // Cleanup the URL object when component is destroyed to prevent memory leaks
  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
}
