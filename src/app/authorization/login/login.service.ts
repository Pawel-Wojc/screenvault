import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
  url = myGlobals.apiLink + '/login';
  private httpClient = inject(HttpClient);
/*
  loginUser(user: logInUser): boolean {
    this.sendLoginRequest(user).subscribe({
      next: (resData: any) => {
        sessionStorage.setItem('accessToken', resData.accessToken);
        sessionStorage.setItem('expiresIn', resData.expiresIn);
        sessionStorage.setItem('refreshToken', resData.refreshToken);
        sessionStorage.setItem('tokenType', resData.tokenType);
      },
      error(err) {
        console.log('Error with login');
        return false;
      },
    });
    
    return true;
  }

  sendLoginRequest(user: logInUser) {
    
    return this.httpClient.post<any>(this.url, user,{ observe: 'response'});
  }
*/
  loginUser(authString: string): Observable<any>{
    const headers = new HttpHeaders()
    .set('Authorization', authString); // Adding the Authorization header
  return this.httpClient.post<any>(this.url, {} ,{ headers, observe: 'response' });
  }
}
