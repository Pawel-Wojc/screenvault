import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WallService {
  private getLandingPagePostsUrl = myGlobals.apiLink + '/post/noAuth/getLandingPagePosts';
  private getPostsByTitleUrl = myGlobals.apiLink + '/post/noAuth/getPostsByTitles';
  private getPostsByTagsUrl = myGlobals.apiLink + '/post/noAuth/getPostsByTags';
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

  public getPostsByTitle(pageNo: number, title: string): Observable<any>{
    //alert('change me wall item service');
    return this.httpClient.get(this.getPostsByTitleUrl,
      {params:
        {page: pageNo, 
        pageSize: 20,
        title: title,
      },
    }
  )
  }
  public getPostsByTags(pageNo: number, tags: string[]): Observable<any>{
    alert('change me wall item service');
    return this.httpClient.get(this.getPostsByTagsUrl,
      {params:
        {page: pageNo, 
        pageSize: 20,
        tags: tags,
      },
    }
  )
  }
}
