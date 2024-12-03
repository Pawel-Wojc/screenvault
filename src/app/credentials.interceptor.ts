  HttpHandler,
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function CredentialsInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  console.log('CredentialsInterceptor', req.url);
  const clonedRequest = req.clone({ withCredentials: true });
  return next(clonedRequest);
}
