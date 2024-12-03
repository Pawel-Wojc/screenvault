import { Component, Inject, inject, signal, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn: boolean | null = false;

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
