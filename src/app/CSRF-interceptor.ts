import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function CSRFInterceptor(req: HttpRequest<any>,next: HttpHandlerFn): Observable<HttpEvent<any>> {

  // Nazwa ciasteczka, z którego pobieramy token
  var XSRF_COOKIE_NAME = 'XSRF-TOKEN';

  // Nazwa nagłówka, w którym przesyłamy token do serwera
  var XSRF_HEADER_NAME = 'X-XSRF-TOKEN';
  
  var xsrfToken = getCookie(XSRF_COOKIE_NAME);
      // Sprawdź, czy token istnieje i czy żądanie wymaga mutacji
      if (xsrfToken && isMutatingRequest(req)) {
        
        const clonedRequest = req.clone({
          headers: req.headers.set(XSRF_HEADER_NAME, xsrfToken)
        });
  
        // Przekazujemy zmodyfikowane żądanie dalej
        return next(clonedRequest);
      }
  
      // Jeśli nie ma tokena lub żądanie nie wymaga mutacji, przekazujemy żądanie bez zmian
      return next(req);
}

// Pobiera ciasteczko o podanej nazwie
function getCookie(name: string): string | null {
    const matches = document.cookie.match(new RegExp(
      `(^| )${name}=([^;]+)`
    ));
    return matches ? decodeURIComponent(matches[2]) : null;
}

// Sprawdza, czy żądanie jest mutujące
function isMutatingRequest(req: HttpRequest<any>): boolean {
    return ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
}