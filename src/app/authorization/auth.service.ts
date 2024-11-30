import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  http = inject(HttpClient);
  constructor() {
    this.checkAuthStatus();
  }
  login() {
    this.isAuthenticatedSubject.next(true);
  }
  logout(): Observable<any> {
    return this.http
      .post('/api/auth/logout', {}, { withCredentials: true })
      .pipe(
        tap(() => {
          // On successful logout, set isAuthenticated to false
          this.isAuthenticatedSubject.next(false);
        })
      );
  }

  checkAuthStatus(): void {
    this.http.get('/api/auth/status', { withCredentials: true }).subscribe(
      () => {
        // If the server confirms authentication, update state
        this.isAuthenticatedSubject.next(true);
      },
      () => {
        // If not authenticated, ensure the state is false
        this.isAuthenticatedSubject.next(false);
      }
    );
  }
}
