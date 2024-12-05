import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WallItemComponent } from './wall-item/wall-item.component';
import { NgFor } from '@angular/common';
import { Post } from './post';
import { WallService } from './wall.service';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [WallItemComponent],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css',
})
export class WallComponent {

  @ViewChild('scrollPostsWrapper') scrollPostsWrapper!: ElementRef;

  listOfPosts: Post[] =[];
  pageNo: number = 0;
  isLoading: boolean = false;

  private wallService = inject(WallService);

  ngOnInit(){
    this.loadPosts();
  }

  hangleChangeOfRating(x:number){
    console.log(x);
  }

  checkScrollPosition(): boolean {
    const container = this.scrollPostsWrapper.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
  }

  loadPosts(){
    this.isLoading = true;

    this.wallService.getLandingPagePosts(this.pageNo).subscribe({
      next: (response) => {
        console.log(response.content);
        this.listOfPosts =[...this.listOfPosts, ...response.content];
        this.isLoading = false;
        this.pageNo++;
      },
      error:(error)=> {
        console.error('Error fetching posts', error);
        this.isLoading = false;
      },
    });
  }
}
