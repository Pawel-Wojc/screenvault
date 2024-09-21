import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';

@Injectable({ providedIn: 'root' })
export class CreateAnonymousPostService {
  //call api for anonymous post creation
  private httpClient = inject(HttpClient);

  createAnonymousPost(file: File, title: string) {
    const url = myGlobals.apiLink + '/post/anonymous/create';
    const formData: FormData = new FormData();
    formData.append('file', file);

    const params = new HttpParams().set('title', title);
    return this.httpClient.post(url, formData, { params });
  }
}
