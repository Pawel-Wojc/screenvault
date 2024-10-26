import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  imgSrc:string ='dsad';

}
