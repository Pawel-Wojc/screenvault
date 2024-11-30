import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private refreshTokenURL: string = myGlobals.apiLink  + "/authentication/noAuth/refreshToken";

  private httpClient = inject(HttpClient);

  refreshToken(): Observable<any>{
    return this.httpClient.get(this.refreshTokenURL);
  }
}
