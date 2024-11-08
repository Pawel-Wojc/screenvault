import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop-test',
  standalone: true,
  imports: [],
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
          name: 'first funny photo',
          url: 'https://fastly.picsum.photos/id/658/1280/960.jpg?hmac=yDYqssxczLgZ7oguYI0Nsj6s0ZDHpvT5dgdTG0T6ZzI',
          status: 'public',
        },
        {
          name: 'second funny photo',
          url: 'https://fastly.picsum.photos/id/658/1280/960.jpg?hmac=yDYqssxczLgZ7oguYI0Nsj6s0ZDHpvT5dgdTG0T6ZzI',
          status: 'private',
        },
        {
          name: 'third funny photo',
          url: 'https://fastly.picsum.photos/id/658/1280/960.jpg?hmac=yDYqssxczLgZ7oguYI0Nsj6s0ZDHpvT5dgdTG0T6ZzI',
          status: 'public',
        },
      ],
    },
    {
      id: 2,
      name: 'My favorite photos',
      photos: [
        { name: 'first favorite photo', url: '', status: 'private' },
        { name: 'second favorite photo', url: '', status: 'private' },
        { name: 'third favorite photo', url: '', status: 'public' },
      ],
    },
    {
      id: 3,
      name: 'Other photos',
      photos: [
        { name: 'first other photo', url: '', status: 'private' },
        { name: 'second other photo', url: '', status: 'private' },
        { name: 'third other photo', url: '', status: 'private' },
      ],
    },
    {
      id: 4,
      name: 'Memes',
      photos: [],
    },
  ];
}
