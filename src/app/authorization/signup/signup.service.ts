import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { newUser } from '../interfaces/newUser';
import * as myGlobals from '../../global';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private httpClient = inject(HttpClient);

  registerUser(user: newUser) {
    this.sendSignupRequest(user).subscribe({});
  }

  sendSignupRequest(user: newUser) {
    const url = myGlobals.apiLink + '/register';
    return this.httpClient.post<any>(url, user);
  }
}
