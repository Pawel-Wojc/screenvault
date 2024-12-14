import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WallItemComponent } from './wall-item/wall-item.component';
import { Post } from './post';
import { WallService } from './wall.service';
import { ActivatedRoute } from '@angular/router';
import { PassQueryParamsService } from '../../navbar/pass-query-params.service';
import { filter, fromEvent, map, Subscription, throttleTime } from 'rxjs';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [WallItemComponent],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css',
})
export class WallComponent {
  @ViewChild('scrollPostsWrapper') scrollPostsWrapper!: ElementRef;

  listOfPosts: Post[] = [];
  pageNo: number = 0;
  isLoading: boolean = false;

  private scrollSubscription!: Subscription;

  private title: string | null = null;
  private tags: string[] | null = null;

  private wallService = inject(WallService);
  private route = inject(ActivatedRoute);
  private passQueryParamsService = inject(PassQueryParamsService);

  ngOnInit() {
    //get tags if there are some search by them 
    this.passQueryParamsService.getTags()?.subscribe({
      next: (tags) => {
        this.tags = tags;

        if (this.tags) {
          this.resetPosts();

          this.loadPostsByTags();
        } 
      },
    });

    //get title, if there is title serch posts by it
    //if there is no title nor tags, just get posts
    this.passQueryParamsService.getTitle()?.subscribe({
      next: (title) => {
       this.title = title;

        if (this.title) {
          this.resetPosts();

          this.loadPostsByTitle();
        }
        else  {
          this.resetPosts();

          this.loadLandingPagePosts();
        }
      },
    });
  }

  resetPosts() {
    this.pageNo = 0;
    this.listOfPosts = [];
  }

  ngAfterViewInit() {
    // Setup scroll event listener with throttling
    this.scrollSubscription = fromEvent(
      this.scrollPostsWrapper.nativeElement,
      'scroll'
    )
      .pipe(
        throttleTime(50),
        map(() => this.checkScrollPosition()),
        filter((isBottom) => isBottom && !this.isLoading)
      )
      .subscribe(() => {
        if (this.title) {
          this.loadPostsByTitle();
        } else if (this.tags) {
          this.loadPostsByTags();
        } else {
          this.loadLandingPagePosts();
        }
      });
  }

  hangleChangeOfRating(hangeOfRating: number, id: string) {
    const index = this.listOfPosts.findIndex((p) => p.id === id);
    const post = this.listOfPosts.find((p) => p.id === id);
    post!.score += hangeOfRating;
    this.listOfPosts[index] = post as Post;
  }

  checkScrollPosition(): boolean {
    const container = this.scrollPostsWrapper.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - threshold
    );
  }

  loadLandingPagePosts() {
    this.isLoading = true;

    this.wallService.getLandingPagePosts(this.pageNo).subscribe({
      next: (response) => {
        this.listOfPosts = [...this.listOfPosts, ...response.posts.content];
        this.isLoading = false;
        this.pageNo++;
      },
      error: (error) => {
        console.error('Error fetching posts', error);
        this.isLoading = false;
      },
    });
  }

  loadPostsByTags() {
    this.isLoading = true;

    this.wallService
      .getPostsByTags(this.pageNo, this.tags as string[])
      .subscribe({
        next: (response) => {
          this.listOfPosts = [...this.listOfPosts, ...response.posts.content];
          this.isLoading = false;
          this.pageNo++;
        },
        error: (error) => {
          console.error('Error fetching posts', error);
          this.isLoading = false;
        },
      });
  }

  loadPostsByTitle() {
    this.isLoading = true;

    this.wallService
      .getPostsByTitle(this.pageNo, this.title as string)
      .subscribe({
        next: (response) => {
          this.listOfPosts = [...this.listOfPosts, ...response.posts.content];
          this.isLoading = false;
          this.pageNo++;
        },
        error: (error) => {
          console.error('Error fetching posts', error);
          this.isLoading = false;
        },
      });
  }
}
