import { Component, inject, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService: AuthService = inject(AuthService);
  isLoggedIn = signal(false);
  ngOnInit() {
    //this.isLoggedIn.set(false);
    this.isLoggedIn.set(this.authService.isLoggedIn());
  }

  logout() {
    this.authService.isLoggedIn.set(false);
    this.isLoggedIn.set(false);
  }

  login() {
    this.authService.isLoggedIn.set(true);
    this.isLoggedIn.set(true);
  }
}
