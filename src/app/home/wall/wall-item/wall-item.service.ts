import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../../global';
import { Observable } from 'rxjs';
import { Rating } from './rating';
import { RatingPayload } from './rating-payload';

@Injectable({
  providedIn: 'root',
})
export class WallItemService {
  
  private postRatingUrl = myGlobals.apiLink + '/rating/postRating';
  private deleteRatingUrl = myGlobals.apiLink + '/rating/deleteRating';

  private httpClient = inject(HttpClient);

  public postRating(postId: string, score: Rating): Observable<any> {
    //const url = `${myGlobals.apiLink}/post/like?postId=${postId}`;
    //alert('change me wall item service');
    console.log(score);
    return this.httpClient.post(this.postRatingUrl, new RatingPayload(postId, score));
  }

  public deleteRating(postId: string): Observable<any> {
    //const url = `${myGlobals.apiLink}/post/dislike?postId=${postId}`;
   // alert('change me wall item service');
    return this.httpClient.post(this.deleteRatingUrl, {postId: postId});
  }

}
