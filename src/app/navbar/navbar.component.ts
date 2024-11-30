import { Component, Inject, inject, signal, Signal } from '@angular/core';
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
  authService = inject(AuthService);
  isLoggedIn = false;

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout() {
    //this.authService.isLoggedIn.set(false);
    //this.isLoggedIn.set(false);
  }

  login() {
    // this.authService.isLoggedIn.set(true);
    // this.isLoggedIn.set(true);
  }
}
