import { Component, inject, input, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WallItemService } from './wall-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { reportService } from '../../report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wall-item',
  standalone: true,
  imports: [MatTooltipModule, CommonModule],
  templateUrl: './wall-item.component.html',
  styleUrl: './wall-item.component.css',
})
export class WallItemComponent {
  private wallItemService = inject(WallItemService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private reportService = inject(reportService);

  svgMinus: string = 'icons/minus-red.svg';
  svgPlus: string = 'icons/plus-green.svg';
  id = input<string>();
  title = input<string>();
  imageUrl = input<string>();
  score = input<number>();
  viewCount = input<number>();
  commentCount = input<number>();
  postHoverFlag = false;

  disLikePost() {
    console.log(this.id());
    console.log(this.imageUrl());
    alert('fix dilike post wall-item');
    this.wallItemService.dislikePost('this.id()').subscribe({
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
    alert('fix like post wall-item');
    this.wallItemService.likePost('this.id()').subscribe({
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
  
  navigateToCommentsectionComponent() {
    this.router.navigate(['/home/commentSection/replaceMEEE']);
  }

  reportPost(){
    alert('implement me');
    this.reportService.reportPost('').subscribe({
      next: (response) => {

        if (response.status == 200) {
          this.openSnackBar("The report has been sent successfully.");
        }

      },
      error: (error) => {
       // console.log(error);
       this.openSnackBar(error.statusText);
      },
    });
    
  }
  
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}