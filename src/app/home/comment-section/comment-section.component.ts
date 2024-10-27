import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommentServiceService } from './comment-service.service'

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  imgSrc: string ='dsad';


  private formBuilder = inject(FormBuilder);
  private commentService = inject(CommentServiceService);

  addCommentForm: FormGroup;

  constructor(){
    this.addCommentForm = this.formBuilder.group({
      comment: ['',Validators.required],
    });
  }

  ngOnInit(){
    alert('implement view counter api call');
    alert('implement get call for picture');
    alert(' implement get comments');
  }

  saveComment(){
    alert("implement me!!!!!!");
    alert(this.addCommentForm.value.comment);
    this.addCommentForm.reset();
  }

  get buttonActive(){
    return this.addCommentForm.valid ? 'active-button' : 'inactive-button';
  }

}
