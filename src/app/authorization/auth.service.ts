import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as myGlobals from '../global';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  url = myGlobals.apiLink + '/authentication/noAuth/whoAmI';
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  http = inject(HttpClient);
  constructor() {
    this.checkAuthStatusFromApi().subscribe((res) => {
      this.isAuthenticatedSubject.next(res.user.role == 'USER');
    });
  }

  logout(): Observable<any> {
    this.isAuthenticatedSubject.next(false);
    // IMPORTANT create api call, no endpoint yet
    return this.http.post('/api/auth/logout', {}).pipe(
      tap(() => {
        // On successful logout, set isAuthenticated to false
      })
    );
  }

  updateAuthStatus() {
    this.checkAuthStatusFromApi().subscribe((res) => {
      this.isAuthenticatedSubject.next(res.user.role == 'USER');
    });
  }

  checkAuthStatusFromApi(): Observable<any> {
    return this.http.get(this.url);
  }
}
