import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Collection } from './collection';
import { AddPostToCollectionPayload } from './addPostToCollectionPayload';

interface CollectionForProfile {
  id: string;
  name: string;
  posts: Post[];
}

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  isPublic: boolean;
}

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
  private getPostsDetailsUrl =
    myGlobals.apiLink + '/post/getPostsByCollectionId';
  private deletePostUrl = myGlobals.apiLink + '/post/deletePost';

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
    this.addPostToCollection(postId, newCollectionId).subscribe((res) => {
      if (res.success) {
        this.deletePostFromCollection(postId, currentCollectionId).subscribe(
          (res) => {}
        ),
          (error: any) => {};
      }
    });
  }
  public getUsersCollections(): Observable<any> {
    return this.httpClient.get(this.getMyCollectionsUrl);
  }

  getUsersCollectionsForProfile(): Observable<CollectionForProfile[]> {
    return this.httpClient.get<any>(this.getMyCollectionsUrl).pipe(
      switchMap((response) => {
        const collections = response.collectionList;
        const requests = collections.map(
          (collection: { id: string; name: string }) =>
            this.getPostsDetails(collection.id).pipe(
              map((posts) => ({
                ...collection,
                posts,
              }))
            )
        );
        return forkJoin(requests) as Observable<CollectionForProfile[]>;
      })
    );
  }

  public getPostsDetails(postId: string): Observable<Post[]> {
    const params = new HttpParams()
      .set('collectionId', postId)
      .set('page', 0)
      .set('pageSize', 999999);
    return this.httpClient
      .get<any>(this.getPostsDetailsUrl, { params: params })
      .pipe(
        map((response) => {
          const posts = response.posts.content;

          return posts.map(
            (post: { id: any; title: any; imageUrl: any; public: any }) => ({
              id: post.id,
              title: post.title,
              imageUrl: post.imageUrl,
              isPublic: post.public,
            })
          );
        })
      );
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
    const data = { postId: postId, collectionId: collectionId };

    return this.httpClient.patch(this.deletePostFromCollectionUrl, data);
  }

  public deletePost(postId: string): Observable<any> {
    const data = { postId: postId };
    return this.httpClient.delete(this.deletePostUrl, {
      body: data,
    });
  }
}
