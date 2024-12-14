import { Component, Inject, inject, signal, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PassQueryParamsService } from './pass-query-params.service';


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
  private passQueryParamsService = inject(PassQueryParamsService);

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
    const input: string = this.searchForm.value.input.trim();

    if(!input){
      return;
    }

    //if search by tags
    if(input.charAt(0) === '#'){
      const tags: string[] =  input.split(/\s*,\s*|\s/);
      this.passQueryParamsService.setTags(tags);
    }
    //search by title
    else{
      this.passQueryParamsService.setTitle(input);
    }
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout().subscribe();
  }

  goHome(){
    this.passQueryParamsService.setTags(null);
    this.passQueryParamsService.setTitle(null);
    this.router.navigate(['']);
    
  }
}
