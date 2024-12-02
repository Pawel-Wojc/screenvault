import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import * as myGlobals from './/global';
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  http = inject(HttpClient);

  private refreshUrl =
    myGlobals.apiLink + '/authentication/noAuth/refreshToken';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.refreshToken(req, next);
        }
        return throwError(() => error);
      })
    );
  }
  refreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.http.get(this.refreshUrl, { withCredentials: true }).pipe(
        switchMap(() => {
          this.isRefreshing = false;
          return next.handle(req);
        }),
        catchError((refreshError) => {
          this.isRefreshing = false;
          return throwError(() => refreshError);
        })
      );
    } else {
      return throwError(
        () => new Error('refresh token request already in progress')
      );
    }
  }
}
