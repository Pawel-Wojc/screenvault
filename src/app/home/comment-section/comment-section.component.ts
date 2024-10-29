import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommentServiceService } from './comment-service.service';
import { Comment } from './comment';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css',
  providers: [DatePipe]
})
export class CommentSectionComponent {
  imgSrc: string ='dsad';
  comments: Comment[] = [];

  private formBuilder = inject(FormBuilder);
  private commentService = inject(CommentServiceService);
  private datePipe = inject(DatePipe);

  addCommentForm: FormGroup;

  constructor(){
    this.addCommentForm = this.formBuilder.group({
      comment: ['',Validators.required],
    });
  }

  ngOnInit(){
    alert('implement view counter api call implement get call for picture  implement get comments post comment fill comment obj');


    this.comments = this.commentService.getComments();
   // console.log(this.commentService.getComments());
   // console.log(this.comments);

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
    console.log(newComment);
    this.addCommentForm.reset();
  }

  get buttonActive(){
    return this.addCommentForm.valid ? 'active-button' : 'inactive-button';
  }

}
