import { Component } from '@angular/core';
import { WallItemComponent } from './wall-item/wall-item.component';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [WallItemComponent],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css',
})
export class WallComponent {
  //call api to get 20 items with photos and tags
}
