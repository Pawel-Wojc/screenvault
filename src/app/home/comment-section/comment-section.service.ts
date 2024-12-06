import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';
import * as myGlobals from '../../global';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private getCommentsUrl: string = myGlobals.apiLink + "/comment/noAuth/getCommentsUnderPost";
  private getPostByIdUrl: string = myGlobals.apiLink + "/post/noAuth/getPostById";

  private httpClient = inject(HttpClient);
  
  public getPostById(id: string): Observable<any>{
    return this.httpClient.get(this.getPostByIdUrl, 
      {
        params:
              {
                postId: id, 
              }
       },
    )
  }
  
  getComments(postId: string, pageNo: number): Observable<any>{
    return this.httpClient.get(this.getCommentsUrl,
      {params:
        {
          postId: postId,
          page: pageNo, 
          pageSize: 20
        },
    }
  )
    
  }
  
}
