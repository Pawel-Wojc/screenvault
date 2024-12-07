import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../../global';

@Injectable({ providedIn: 'root' })
export class GetAnonymousPostService {
  private httpClient = inject(HttpClient);

  getAnonymousPost(linkId: string) {
    const url = myGlobals.apiLink + '/post/anonymous/get';
    const params = new HttpParams().set('linkId', linkId);
    return this.httpClient.get(url, { params, responseType: 'blob' });
  }
}
