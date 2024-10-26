import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wall-item',
  standalone: true,
  imports: [],
  templateUrl: './wall-item.component.html',
  styleUrl: './wall-item.component.css',
})
export class WallItemComponent {
  id = input<any>();
  private router =  inject(Router)

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

  navigateToCommentsectionComponent(){
    this.router.navigate(['/home/commentSection/replaceMEEE']);
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
