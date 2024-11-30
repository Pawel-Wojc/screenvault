import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportRequest } from './reportRequest';

@Injectable ({providedIn: 'root'})

export class reportService{
    private httpClient = inject(HttpClient);
    private reportPostUrl = myGlobals.apiLink + '/report/reportPost';
    private reportCommentUrl = myGlobals.apiLink + '/report/reportComment';

    public reportPost(postId: string): Observable<any>{
        console.log('rep post');
        return this.httpClient.post(
            this.reportPostUrl,
            new ReportRequest(postId),    
        );
    }

    public reportComment(commentId: string): Observable<any>{
        return this.httpClient.post(
            this.reportCommentUrl,
            new ReportRequest(commentId),
            );
    }
}