import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { newUser } from '../interfaces/newUser';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private httpClient = inject(HttpClient);
  private url = myGlobals.apiLink + '/register';
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit() {
    //check if the user is already logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  registerUser(user: newUser): Observable<any> {
    return this.httpClient.post<any>(this.url, user, { observe: 'response' });
  }
}
