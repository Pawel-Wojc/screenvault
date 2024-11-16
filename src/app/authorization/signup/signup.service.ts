import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { newUser } from '../interfaces/newUser';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private httpClient = inject(HttpClient);
  private url = myGlobals.apiLink + '/authentication/register';

  registerUser(user: newUser): Observable<any> {
    return this.httpClient.post<any>(this.url, user, { observe: 'response', withCredentials: true });
  }
}
