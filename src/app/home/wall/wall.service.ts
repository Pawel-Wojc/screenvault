import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  private getLandingPagePostsUrl = myGlobals.apiLink +'/post/noAuth/getLandingPagePosts';
  private httpClient = inject(HttpClient);

  public getLandingPagePosts(pageNo: number): Observable<any>{
    //alert('change me wall item service');
    return this.httpClient.get(this.getLandingPagePostsUrl,
      {params:
        {page: pageNo, 
        pageSize: 20
      },
    }
  )
  }
}
