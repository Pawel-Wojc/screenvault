import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../../global';

@Injectable({ providedIn: 'root' })
export class GetAnonymousPostService {
  private httpClient = inject(HttpClient);
}
