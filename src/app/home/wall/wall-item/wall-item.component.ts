import { Component, inject, input, output} from '@angular/core';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WallItemService } from './wall-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { reportService } from '../../report.service';
import { CommonModule } from '@angular/common';
import { Rating } from './rating';
import { GetRoleService } from '../../../authorization/get-role.service';
import { Post } from '../post';
import { AuthService } from '../../../authorization/auth.service';

@Component({
  selector: 'app-wall-item',
  standalone: true,
  imports: [MatTooltipModule, CommonModule],
  templateUrl: './wall-item.component.html',
  styleUrl: './wall-item.component.css',
})
export class WallItemComponent {
  private wallItemService = inject(WallItemService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private reportService = inject(reportService);
  private getRoleService = inject(GetRoleService);
  private authService = inject(AuthService);

  svgMinus: string = 'icons/minus-black.svg';
  svgPlus: string = 'icons/plus-black.svg';

  id = input<string>();
  title = input<string>();
  imageUrl = input<string>();
  score = input<number>();
  viewCount = input<number>();
  commentCount = input<number>();
  rating = input<Rating>();

  emitChangeOfRating = output<number>();

  postHoverFlag = false;

  private postDislikedFlag: boolean = false;
  private postLikedFlag: boolean = false;

  ngOnInit(){
    //reset like/dislike buttons on logout
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if(!isAuthenticated){
        this.svgPlus = 'icons/plus-black.svg';
        this.svgMinus = 'icons/minus-black.svg';
      }
    });
    
    if(this.rating() === Rating.LIKE){
      
      this.postLikedFlag = true;
      this.svgPlus = 'icons/plus-green.svg';

    }
    else if(this.rating() === Rating.DISLIKE){

      this.postDislikedFlag = true;
      this.svgMinus = 'icons/minus-red.svg';

    }
  }

  async disLikePost() {
    if(await this.getRoleService.ifUserLogged()){

      this.postDislikedFlag = !this.postDislikedFlag;

      //if disliked
      if(this.postDislikedFlag){
        //and liked before    
        if(this.postLikedFlag){
          this.emitChangeOfRating.emit(-2);
          this.postLikedFlag = false;
          this.svgPlus = 'icons/plus-black.svg';
        }
        //and wasn't liked
        else{
          this.emitChangeOfRating.emit(-1);
        }

        this.svgMinus = 'icons/minus-red.svg';
        this.ratePost(this.id() as string, Rating.DISLIKE);
      }
      //if undone dislike
      else{
        this.emitChangeOfRating.emit(1);
        this.svgMinus = 'icons/minus-black.svg';
        this.removeRating(this.id() as string);
      }
      
    }
    else{
      this.openSnackBar('Hey! Sign in to perform this action');
    }
  }

  async likePost() {
    if(await this.getRoleService.ifUserLogged()){

      this.postLikedFlag = !this.postLikedFlag;
      //if liked
      if(this.postLikedFlag){
            
        //and was disliked
        if(this.postDislikedFlag){
          this.postDislikedFlag = false;
          this.emitChangeOfRating.emit(2);
          this.svgMinus = 'icons/minus-black.svg';
        }
        //and wasn't disliked
        else{
          this.emitChangeOfRating.emit(1);
        }

        this.svgPlus = 'icons/plus-green.svg';
        this.ratePost(this.id() as string, Rating.LIKE);
      } 
      //if undone like
      else{
        this.svgPlus = 'icons/plus-black.svg';
        this.emitChangeOfRating.emit(-1);
        this.removeRating(this.id() as string);
      }

    }
    else{
      this.openSnackBar('Hey! Sign in to perform this action');
    }
  }

  ratePost(postId: string, rating: Rating){
    this.wallItemService.postRating(postId, rating).subscribe({
      next: (response) => {

       // console.log('liked ' + this.postLikedFlag);
       // console.log('disliked ' + this.postDislikedFlag);

      },
      error: (error) => {
        this.openSnackBar( "Sorry, we can't perform this action right now. :(");
      },
    });
  }
  
  navigateToCommentsectionComponent() {
    this.router.navigate(['/commentSection/',{ id: this.id() }]);
  }

  async reportPost(){
    if(!await this.getRoleService.ifUserLogged()){
      this.openSnackBar('Hey! Sign in to perform this action');
      return;
    }

    this.reportService.reportPost(this.id() as string).subscribe({
      next: (response) => {
        
        if (response.success) {
          this.openSnackBar("The report has been sent successfully.");
        }

      },
      error: (error) => {
       // console.log(error);
       this.openSnackBar(error.statusText);
      },
    });
    
  }

  removeRating(id: string){
    this.wallItemService.deleteRating(id).subscribe({
      next: (r) =>{},
      error: (e) =>{
        this.openSnackBar("Error unable to remove rating.");
      }
      
    });
  }
  
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}