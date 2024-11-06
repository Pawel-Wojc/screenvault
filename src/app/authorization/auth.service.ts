import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal(false);
  //getting information about user is logged in or not
  login() {
    this.isLoggedIn.set(true);
  }
  logout() {
    this.isLoggedIn.set(false);
  }
}
