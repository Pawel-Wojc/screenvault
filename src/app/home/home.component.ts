import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { WallComponent } from './wall/wall.component';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, WallComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
