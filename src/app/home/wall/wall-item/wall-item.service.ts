import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WallItemService {
  
  private httpClient = inject(HttpClient);

  public likePost(postId: string) {
    const url = `${myGlobals.apiLink}/post/like?postId=${postId}`;
    alert('change me wall item service');
    return this.httpClient.post(url, {}, { observe: 'response' });
  }

  public dislikePost(postId: string) {
    const url = `${myGlobals.apiLink}/post/dislike?postId=${postId}`;
    alert('change me wall item service');
    return this.httpClient.post(url, {}, { observe: 'response' });
  }

}
