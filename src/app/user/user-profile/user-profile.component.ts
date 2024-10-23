import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authorization/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  ngOnInit() {
    // Check if the user is already logged in
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }
}
