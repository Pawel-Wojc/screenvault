import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private httpClient = inject(HttpClient);

  private postCollectionUrl = myGlobals.apiLink + '/collection/postCollection';
  private addPostToMyCollectionUrl = myGlobals.apiLink + '/collection/addPostToMyCollection';
  private getMyCollectionsUrl = myGlobals.apiLink + '/collection/getMyCollections';
  

}
