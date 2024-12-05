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
  private deleteUserCollectionsUrl =
    myGlobals.apiLink + '/collection/deleteCollection';

  private deletePostFromCollectionUrl =
    myGlobals.apiLink + '/collection/removePostFromMyCollection';

  public addCollection(name: string): Observable<any> {
    const data = { collection: { name: name } };
    return this.httpClient.post(this.postCollectionUrl, data);
  }

  public addPostToCollection(
    postId: string,
    collectionId: string
  ): Observable<any> {
    return this.httpClient.patch(
      this.addPostToMyCollectionUrl,
      new AddPostToCollectionPayload(postId, collectionId)
    );
  }

  public changePostCollection(
    postId: string,
    currentCollectionId: string,
    newCollectionId: string
  ) {
    this.deletePostFromCollection(postId, currentCollectionId).subscribe(
      () => {}
    );
    this.addPostToCollection(postId, newCollectionId).subscribe(() => {});
  }

  public getUsersCollections(): Observable<any> {
    return this.httpClient.get(this.getMyCollectionsUrl);
  }

  public deleteUserCollections(collectionId: string): Observable<any> {
    const data = { collectionId: collectionId };
    return this.httpClient.delete(this.deleteUserCollectionsUrl, {
      body: data,
    });
  }

  public deletePostFromCollection(
    postId: string,
    collectionId: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('collectionId', collectionId);

    return this.httpClient.post(this.deletePostFromCollectionUrl, formData);
  }
}
