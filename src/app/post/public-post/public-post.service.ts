import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class PublicPostService{
    private httpClient = inject(HttpClient);
    private url = myGlobals.apiLink + '/post/uploadPost';
    
    public publicPost(post: any): Observable<any>{
        return this.httpClient.post<any>(this.url,post);
    }
  
}