import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
  url = myGlobals.apiLink + '/authentication/noAuth/login';
  private httpClient = inject(HttpClient);

  loginUser(authString: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + authString
    ); // Adding the Authorization header
    headers.set('withCredentials', 'true' );
    return this.httpClient.post<any>(
      this.url,
      {},
      { withCredentials: true, headers, observe: 'response' }
    );
  }
}
