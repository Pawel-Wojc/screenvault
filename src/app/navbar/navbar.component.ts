import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from '../authorization/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoggedIn$!: Observable<boolean>;

 // constructor(private authService: AuthService) {}

  ngOnInit() {
 //   this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout() {
//    this.authService.logout();
  }
}
