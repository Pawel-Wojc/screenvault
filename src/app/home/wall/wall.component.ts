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

  listOfPosts: Post[] =[];
  pageNo: number = 0;
  isLoading: boolean = false;
  
  private scrollSubscription!: Subscription;

  private title?: string | null;
  private tags?: string[] | null; 

  private wallService = inject(WallService);
  private route = inject(ActivatedRoute);
  private passQueryParamsService = inject(PassQueryParamsService);

  ngOnInit(){
    this.passQueryParamsService.getTags()?.subscribe({
      next: (tags) =>{
        if(tags){
          this.tags = tags;
          console.log(this.tags + " tag");
        }
        else{
          console.log('dej1');
          this.loadLandingPagePosts();
        }
      }
    });

    this.passQueryParamsService.getTitle()?.subscribe({
      next: (title) =>{
        if(title){
          this.title = title;
          console.log(this.title + " title");
        }
        else{
          console.log('dej2');
         // this.loadLandingPagePosts();
        }
      }
    });
    /*
    this.route.params.subscribe(params => {
      this.title = params['title'];
     

      console.log(this.title + " tit");
      console.log(this.tags + " tag");
    });

    */

   
    
  }

  ngAfterViewInit() {
    // Setup scroll event listener with throttling
   // console.log('dfg');
   // console.log(this.scrollPostsWrapper.nativeElement);
    this.scrollSubscription = fromEvent(this.scrollPostsWrapper.nativeElement, 'scroll')
      .pipe(
        throttleTime(50),
        map(() => this.checkScrollPosition()),
        filter(isBottom => isBottom && !this.isLoading)
      )
      .subscribe(() => this.loadLandingPagePosts());
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
   console.log('check');
    const container = this.scrollPostsWrapper.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
  }

  loadLandingPagePosts(){
    this.isLoading = true;
    console.log('load');

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
