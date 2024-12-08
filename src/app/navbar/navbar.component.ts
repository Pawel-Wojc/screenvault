import { Component, Inject, inject, signal, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  isLoggedIn: boolean | null = false;
  searchForm: FormGroup;

  constructor(){
    this.searchForm = this.formBuilder.group({
      input: [''],
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  search(){
    console.log('test');
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
