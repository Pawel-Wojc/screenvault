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

  hangleChangeOfRating(hangeOfRating: number, id: string){
    //console.log(hangeOfRating+" "+ id);

    const index = this.listOfPosts.findIndex((p)=> p.id === id);
    const post = this.listOfPosts.find((p)=> p.id === id);
    post!.score += hangeOfRating;
    this.listOfPosts[index] = post as Post;
    //console.log(index);
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
       // console.log(response);
        this.listOfPosts =[...this.listOfPosts, ...response.posts.content];
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
