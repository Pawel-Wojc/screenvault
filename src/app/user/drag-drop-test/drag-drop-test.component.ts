import { Component } from '@angular/core';
import { DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-drop-test',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './drag-drop-test.component.html',
  styleUrl: './drag-drop-test.component.css',
})
export class DragDropTestComponent {
  userCollections = [
    //this data from api
    {
      id: 1,
      name: 'Funny photos',
      photos: [
        {
          name: 'second funny photo',
          url: 'https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'private',
        },
        {
          name: 'third funny photo',
          url: 'https://fastly.picsum.photos/id/774/200/200.jpg?hmac=kHZuEL0Tzh_9wUk4BnU9zxodilE2mGBdAAor2hKpA_w',
          status: 'public',
        },
      ],
    },
    {
      id: 2,
      name: 'My favorite photos',
      photos: [
        {
          name: 'second favorite photo',
          url: 'https://fastly.picsum.photos/id/841/200/200.jpg?hmac=jAPzaXgN_B37gVuIQvmtuRCmYEC0lJP86OZexH1yam4',
          status: 'private',
        },
        {
          name: 'third favorite photo',
          url: 'https://fastly.picsum.photos/id/560/200/200.jpg?hmac=Dqou6QpKCTK2srRsCRhlIxLQHvFL7zz6UocOb3UkpwI',
          status: 'public',
        },
      ],
    },
  ];
  currentCollection = 1;
  // TypeScript
  onDrop(event: any, collection: any): void {
    console.log(event.container.data);
    console.log(event.previousContainer.data);
  }
}
