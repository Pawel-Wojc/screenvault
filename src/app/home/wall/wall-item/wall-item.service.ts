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

    return this.httpClient.post(this.postRatingUrl, new RatingPayload(postId, score));
  }

  public deleteRating(postId: string): Observable<any> {

    return this.httpClient.delete(this.deleteRatingUrl,{body: {postId: postId}});
  }

}
