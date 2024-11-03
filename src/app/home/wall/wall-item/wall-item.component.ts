import { Component, inject, input, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WallItemService } from './wall-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-wall-item',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './wall-item.component.html',
  styleUrl: './wall-item.component.css',
})
export class WallItemComponent {
  private wallItemService = inject(WallItemService);
  private snackBar = inject(MatSnackBar);
  svgMinus: string = 'icons/minus-red.svg';
  svgPlus: string = 'icons/plus-green.svg';
  disLikePost() {
    this.wallItemService.dislikePost(this.id()).subscribe({
      next: (response) => {
        //if ok
        if (this.svgMinus == 'icons/minus-red.svg') {
          this.svgPlus = 'icons/plus-black.svg';
        }
      },
      error: (error) => {
        if (error.status == 401) {
          this.openSnackBar('Hey! Sign in to perform this action');
        } else {
          this.openSnackBar(
            "Sorry, we can't perform this action right now. :("
          );
        }
      },
    });
  }
  likePost() {
    this.wallItemService.likePost(this.id()).subscribe({
      next: (response) => {
        if (this.svgPlus == 'icons/plus-green.svg') {
          this.svgMinus = 'icons/minus-black.svg';
        }
        console.log('Post liked successfully:', response.status);
      },
      error: (error) => {
        if (error.status == 401) {
          this.openSnackBar('Hey! Sign in to perform this action');
        } else {
          this.openSnackBar(
            "Sorry, we can't perform this action right now. :( "
          );
        }
      },
    });
  }
  id = input<any>();
  private router = inject(Router);

  randomnumber = Math.floor(Math.random() * popularImageDimensions.length);
  imageWidth = popularImageDimensions[this.randomnumber].width;
  imageHeight = popularImageDimensions[this.randomnumber].height;
  imageUrl = signal('');

  ngOnInit() {
    this.imageUrl.set(
      `https://picsum.photos/${this.imageWidth}/${
        this.imageHeight
      }?random=${this.id()}`
    );
    console.log(this.imageUrl());
  }

  navigateToCommentsectionComponent() {
    this.router.navigate(['/home/commentSection/replaceMEEE']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

const popularImageDimensions = [
  { width: 640, height: 480 },
  { width: 800, height: 600 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
  { width: 3840, height: 2160 },
  { width: 1080, height: 1080 },
  { width: 1200, height: 628 },
  { width: 1200, height: 1200 },
  { width: 1080, height: 1920 },
  { width: 1600, height: 900 },
  { width: 2048, height: 1152 },
  { width: 360, height: 640 },
  { width: 600, height: 400 },
  { width: 640, height: 360 },
  { width: 1280, height: 960 },
  { width: 4000, height: 3000 },
  { width: 1920, height: 1200 },
  { width: 2100, height: 2970 },
];
