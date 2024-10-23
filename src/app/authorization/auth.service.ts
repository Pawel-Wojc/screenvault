import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export abstract class IAuthService {
  // is the current user authenticated?
  abstract isAuthenticated(): boolean;

  // does the current user have one of these roles?
  abstract hasRole(roles: string[]): boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenPresent());
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Checks if a JWT token is present in localStorage
  private isTokenPresent(): boolean {
    //TO DO: Check if the token is valid, not only present !!
    const token = localStorage.getItem('jwtToken');
    return false;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.loggedIn.next(false);
  }
}
