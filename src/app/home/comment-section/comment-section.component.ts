import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommentService } from './comment.service';
import { Comment } from './comment';
import { filter, fromEvent, map, Subscription, throttleTime } from 'rxjs';
import { reportService } from '../report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css',
  providers: [DatePipe]
})

export class CommentSectionComponent {
  @ViewChild('commentsScroll') commentsScroll!: ElementRef;
  imgHoverFlag = false;
  imgSrc: string = '';
  comments: Comment[] = [];
  isLoading = false;
  addCommentForm: FormGroup;
  commentsPageNo: number = 1;
  private scrollSubscription!: Subscription;

  private formBuilder = inject(FormBuilder);
  private commentService = inject(CommentService);
  private datePipe = inject(DatePipe);
  private reportService = inject(reportService);
  private snackBar = inject(MatSnackBar);

  constructor(){
    this.addCommentForm = this.formBuilder.group({
      comment: ['',Validators.required],
    });
  }

  ngOnInit(){
    alert('implement view counter api call implement get call for picture  implement get comments post comment fill comment obj');

    this.loadComments();
   // this.comments = this.commentService.getComments();
   // console.log(this.commentService.getComments());
   // console.log(this.comments);

  }
  ngAfterViewInit() {
    // Setup scroll event listener with throttling
    this.scrollSubscription = fromEvent(this.commentsScroll.nativeElement, 'scroll')
      .pipe(
        throttleTime(50),
        map(() => this.checkScrollPosition()),
        filter(isBottom => isBottom && !this.isLoading)
      )
      .subscribe(() => this.loadComments());
  }

  checkScrollPosition(): boolean {
    const container = this.commentsScroll.nativeElement;
    const threshold = 200; // Trigger 200px before the bottom
    return container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
  }

  loadComments(){
    this.isLoading = true;

    this.commentService.getComments(this.commentsPageNo).subscribe({
      next: (newComments) => {
        this.comments =[...this.comments, ...newComments];
        this.isLoading = false;
        this.commentsPageNo++;
      },
      error:(error)=> {
        console.error('Error fetching comments', error);
        this.isLoading = false;
      },
    });
  }

  reportPost(){
    this.reportService.reportPost('###########################');
    this.openSnackBar("The report has been sent successfully.");
  }

  reportComment(commentId: string){
    this.reportService.reportComment(commentId);
    this.openSnackBar("The report has been sent successfully.");
    this.handleReport(commentId);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  saveComment(){
    alert("implement me!!!!!!");
    const date = new Date();
    let newComment: Comment = {
      id: '',
      userName: '',
      text: this.addCommentForm.value.comment,
      postedOn: this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') as string,
    };
    this.addCommentForm.reset();
  }

  get buttonActive(){
    return this.addCommentForm.valid ? 'active-button' : 'inactive-button';
  }

  handleReport(commentId: string){
    this.comments = this.comments.filter(com => com.id !== commentId);
    if(this.comments.length < 10){
       this.loadComments();
    }  
  }
}
