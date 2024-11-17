import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ({providedIn: 'root'})

export class reportService{
    private httpClient = inject(HttpClient);
    private url = myGlobals.apiLink + '';

    public reportPost(postId: string): Observable<any>{
        return this.httpClient.post(this.url,{});
    }

    public reportComment(commentId: string): Observable<any>{
        return this.httpClient.post(this.url,{});
    }
}