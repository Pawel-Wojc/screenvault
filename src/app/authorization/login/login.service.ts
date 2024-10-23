import { inject, Injectable } from '@angular/core';
import { logInUser } from '../interfaces/logInUser';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../global';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private httpClient = inject(HttpClient);

  loginUser(user: logInUser): Observable<any> {
    return this.sendLoginRequest(user).pipe(
      tap((resData: any) => {
        sessionStorage.setItem('accessToken', resData.accessToken);
        sessionStorage.setItem('expiresIn', resData.expiresIn);
        sessionStorage.setItem('refreshToken', resData.refreshToken);
        sessionStorage.setItem('tokenType', resData.tokenType);
      }),
      catchError((err) => {
        console.log('Error with login');
        return throwError(err);
      })
    );
  }

  sendLoginRequest(user: logInUser) {
    const url = myGlobals.apiLink + '/login';
    return this.httpClient.post<any>(url, user, { observe: 'response' });
  }
}
