import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WallItemComponent } from './wall-item/wall-item.component';
import { NgFor } from '@angular/common';
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

  private title?: string | null;
  private tags?: string[] | null;

  private wallService = inject(WallService);
  private route = inject(ActivatedRoute);
  private passQueryParamsService = inject(PassQueryParamsService);

  ngOnInit() {
    this.passQueryParamsService.getTags()?.subscribe({
      next: (tags) => {
        if (tags) {
          this.tags = tags;

          this.resetPosts();

          this.loadPostsByTags();
          //  console.log(this.tags + " tag");
        } else if (!this.isLoading) {
          //  console.log('dej1');
          this.resetPosts();

          this.loadLandingPagePosts();
        }
      },
    });

    this.passQueryParamsService.getTitle()?.subscribe({
      next: (title) => {
        if (title) {
          this.title = title;

          this.resetPosts();

          this.loadPostsByTitle();
          //  console.log(this.title + " title");
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
    // console.log('load');

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
    // console.log('load');

    this.wallService
      .getPostsByTags(this.pageNo, this.tags as string[])
      .subscribe({
        next: (response) => {
          console.log(response);
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
    // console.log('load');

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
