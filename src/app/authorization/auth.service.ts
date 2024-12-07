import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as myGlobals from '../global';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
  //if null that means the api call is not finished and we don't know user is authenticated or not
  checkAuthStatusUrl = myGlobals.apiLink + '/authentication/noAuth/whoAmI';
  logOutUrl = myGlobals.apiLink + '/authentication/logout';
  isAuthenticated$: Observable<boolean | null> =
    this.isAuthenticatedSubject.asObservable();

  http = inject(HttpClient);
  constructor() {
    this.updateAuthStatus();
  }

  logout() {
    return this.http.delete(this.logOutUrl, { observe: 'response' }).pipe(
      tap((response) => {
        if (response.status === 200) {
          this.isAuthenticatedSubject.next(false);
        }
      })
    );
  }

  setLoginStatus(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  updateAuthStatus() {
    this.checkAuthStatusFromApi().subscribe((res) => {
      this.isAuthenticatedSubject.next(
        res.user.role == 'USER' || res.user.role == 'ADMIN'
      );
    });
  }

  checkAuthStatusFromApi(): Observable<any> {
    return this.http.get(this.checkAuthStatusUrl);
  }
}
