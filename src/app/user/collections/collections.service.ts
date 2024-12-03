import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collection';
import { AddPostToCollectionPayload } from './addPostToCollectionPayload';
 
@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private httpClient = inject(HttpClient);

  private postCollectionUrl = myGlobals.apiLink + '/collection/postCollection';
  private addPostToMyCollectionUrl =
    myGlobals.apiLink + '/collection/addPostToMyCollection';
  private getMyCollectionsUrl =
    myGlobals.apiLink + '/collection/getMyCollections';

  public addCollection(name: string): Observable<any> {
    return this.httpClient.post(
      this.postCollectionUrl,
      this.collectionApiJson(name)
    );
  }

  private collectionApiJson(name: string) {
    return {
      collection: {
        name: name,
      },
    };
  }

  public addPostToCollection(
    postId: string,
    collectionId: string
  ): Observable<any> {
    
    return this.httpClient.patch(this.addPostToMyCollectionUrl, new AddPostToCollectionPayload(postId, collectionId), );
  }

  public getUsersCollections(): Observable<any> {
    return this.httpClient.get(this.getMyCollectionsUrl,);
  }
}
