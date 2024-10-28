import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../../global';

@Injectable({
  providedIn: 'root',
})
export class WallItemService {
  private httpClient = inject(HttpClient);

  likePost(postId: string) {
    const url = `${myGlobals.apiLink}/post/like?postId=${postId}`;
    return this.httpClient.post(url, {}, { observe: 'response' });
  }
  dislikePost(postId: string) {
    const url = `${myGlobals.apiLink}/post/dislike?postId=${postId}`;
    return this.httpClient.post(url, {}, { observe: 'response' });
  }
}
