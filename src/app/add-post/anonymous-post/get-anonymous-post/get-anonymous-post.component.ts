import { Component, OnInit } from '@angular/core';
import { GetAnonymousPostService } from './get-anonymous-post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-anonymous-post',
  standalone: true,
  imports: [],
  templateUrl: './get-anonymous-post.component.html',
  styleUrl: './get-anonymous-post.component.css',
})
export class GetAnonymousPostComponent implements OnInit {
  objectUrl: any;
  /**
   *
   */
  constructor(
    private getAnonymousGetService: GetAnonymousPostService,
    private activatedRoute: ActivatedRoute
  ) {}
  imageId: string = this.activatedRoute.snapshot.paramMap.get('linkId')!;
  imageToShareUrl: string = '';

  ngOnInit(): void {
    console.log(this.imageId);
    this.getAnonymousGetService.getAnonymousPost(this.imageId).subscribe({
      next: (blob: any) => {
        this.objectUrl = URL.createObjectURL(blob);
        console.log(this.objectUrl);
      },
    });
  }
}
