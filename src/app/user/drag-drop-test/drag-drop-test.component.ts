import { Component, signal } from '@angular/core';
import { DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-drag-drop-test',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './drag-drop-test.component.html',
  styleUrl: './drag-drop-test.component.css',
})
export class DragDropTestComponent {
  setCollection(_t9: { id: number; name: string }) {
    throw new Error('Method not implemented.');
  }
  userCollection = [
    { id: 1, name: 'FunnyPhoos' },
    { id: 2, name: 'My favorite photos' },
    { id: 3, name: 'Memes' },
  ];
  userCollectionwithPhotos = [
    {
      id: 1,
      name: 'FunnyPhoos',
      photos: [
        {
          name: 'first funnty photo',
          url: ' https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'private',
        },
        {
          name: 'second funny photo',
          url: ' https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'public',
        },
        {
          name: 'third funny photo',
          url: 'https://fastly.picsum.photos/id/26/200/200.jpg?hmac=A1fbIskzMWVQs1JuyIsJXYGuCgqVwevLXT4YaIJM3Rk',
          status: 'public',
        },
      ],
    },
    {
      id: 2,
      name: 'My favorite photos',
      photos: [
        {
          name: 'first favorite photo',
          url: 'https://fastly.picsum.photos/id/1000/200/200.jpg?hmac=U6gBcO-m8lNXspqhLW17ugDZ1Z3cEcCQj07Wp9Nq7IQ',
          status: 'private',
        },
        {
          name: 'second favorite photo',
          url: 'https://fastly.picsum.photos/id/685/200/200.jpg?hmac=1IjDFMSIa0T_JSvcq79_e2NWPwRJg61Ufbfu4eM4HvA',
          status: 'public',
        },
        {
          name: 'third favorite photo',
          url: 'https://fastly.picsum.photos/id/351/200/200.jpg?hmac=E2C8OwTRNgbEan5RzifMH73ENtpcsHSr45mGFQk5mPU',
          status: 'private',
        },
      ],
    },
    { id: 3, name: 'Memes', photos: [] },
  ];
  userPhotos = [
    {
      collectionid: 1,
      photos: [
        {
          name: 'first funnty photo',
          url: ' https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'private',
        },
        {
          name: 'second funny photo',
          url: ' https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'public',
        },
        {
          name: 'third funny photo',
          url: 'https://fastly.picsum.photos/id/26/200/200.jpg?hmac=A1fbIskzMWVQs1JuyIsJXYGuCgqVwevLXT4YaIJM3Rk',
          status: 'public',
        },
      ],
    },
    {
      collectionid: 2,
      photos: [
        {
          name: 'first favorite photo',
          url: 'https://fastly.picsum.photos/id/1000/200/200.jpg?hmac=U6gBcO-m8lNXspqhLW17ugDZ1Z3cEcCQj07Wp9Nq7IQ',
          status: 'private',
        },
        {
          name: 'second favorite photo',
          url: 'https://fastly.picsum.photos/id/685/200/200.jpg?hmac=1IjDFMSIa0T_JSvcq79_e2NWPwRJg61Ufbfu4eM4HvA',
          status: 'public',
        },
        {
          name: 'third favorite photo',
          url: 'https://fastly.picsum.photos/id/351/200/200.jpg?hmac=E2C8OwTRNgbEan5RzifMH73ENtpcsHSr45mGFQk5mPU',
          status: 'private',
        },
      ],
    },
  ];

  currentCollection = signal<any>(undefined);
  // TypeScript
  onDrop(event: any): void {
    console.log(event.container.data);
    console.log(event.previousContainer.data);
  }
}
