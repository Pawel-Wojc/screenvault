import { inject, Injectable } from '@angular/core';
import { logInUser } from '../interfaces/logInUser';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../global';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private httpClient = inject(HttpClient);

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
    const url = myGlobals.apiLink + '/login';
    return this.httpClient.post<any>(url, user);
  }
}
