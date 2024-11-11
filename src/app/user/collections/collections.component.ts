import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputDialog } from '../../shared/input-dialog/input-dialog';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import {
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [DragDropModule, CommonModule, MatTooltip],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent {
  private dialog = inject(MatDialog);
  openedFolders:
    | {
        id: number;
        name: string;
        photos: {
          name: string;
          url: string;
          status: string;
        }[];
      }[]
    | undefined;
  userCollections = [
    //this data from api
    {
      id: 1,
      name: 'Funny photos',
      photos: [
        {
          name: 'first funny photo',
          url: 'https://picsum.photos/id/1/200/300',
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
        {
          name: 'first favorite photo',
          url: 'https://fastly.picsum.photos/id/1000/200/200.jpg?hmac=U6gBcO-m8lNXspqhLW17ugDZ1Z3cEcCQj07Wp9Nq7IQ',
          status: 'private',
        },
        {
          name: 'second favorite photo',
          url: 'https://fastly.picsum.photos/id/685/200/200.jpg?hmac=1IjDFMSIa0T_JSvcq79_e2NWPwRJg61Ufbfu4eM4HvA',
          status: 'private',
        },
        {
          name: 'third favorite photo',
          url: 'https://fastly.picsum.photos/id/351/200/200.jpg?hmac=E2C8OwTRNgbEan5RzifMH73ENtpcsHSr45mGFQk5mPU',
          status: 'public',
        },
      ],
    },
    {
      id: 3,
      name: 'Other photos',
      photos: [
        {
          name: 'first other photo',
          url: 'https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'private',
        },
        {
          name: 'second other photo',
          url: 'https://fastly.picsum.photos/id/743/200/200.jpg?hmac=p4EqNQGnGvZo65W4_FlXvjPQG8g1ogR7bgvnrQCUnEs',
          status: 'private',
        },
        {
          name: 'third other photo',
          url: 'https://fastly.picsum.photos/id/26/200/200.jpg?hmac=A1fbIskzMWVQs1JuyIsJXYGuCgqVwevLXT4YaIJM3Rk',
          status: 'private',
        },
      ],
    },
    {
      id: 4,
      name: 'Memes',
      photos: [],
    },
  ];

  onDrop(event: any) {
    if (event.previousContainer === event.container) {
      let array = this.userCollections.find((c) => c === event.container.data);
      console.log(array);
      if (array) {
        moveItemInArray(array.photos, event.previousIndex, event.currentIndex);
        //call api to update
      }
    } else {
      let currentArray = this.userCollections.find(
        (c) => c === event.previousContainer.data
      );
      let targetArray = this.userCollections.find(
        (c) => c === event.container.data
      );
      if (currentArray && targetArray) {
        transferArrayItem(
          currentArray.photos,
          targetArray.photos,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  deleteUserCollection(id: number) {
    ///API CALL
    this.userCollections = this.userCollections.filter(
      (collection) => collection.id !== id
    );
  }
  openFolder(folderToOpen: any) {
    if (this.openedFolders) {
      if (this.openedFolders.find((f: any) => f === folderToOpen)) {
        this.openedFolders = this.openedFolders.filter(
          (f: any) => f !== folderToOpen
        );
        console.log('delete');
        return;
      }
    }
    if (this.openedFolders) {
      this.openedFolders.push(folderToOpen);
    } else {
      this.openedFolders = [folderToOpen];
    }
  }

  addNewFolder() {
    //api call
    const dialogRef = this.dialog.open(InputDialog, {
      width: '300px',
      data: {
        title: 'Create new folder',
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        label: 'Folder name',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newFolder = {
          id: this.userCollections.length + 1,
          name: result,
          photos: [],
        };
        this.userCollections.push(newFolder);
        console.log(`Save new folder, folder name ${result}`);
        //create now folder API, then refetch folder list
      }
    });
  }
  renameFolder(id: number) {
    //api call
    const collection = this.userCollections.find((c) => c.id === id);
    if (collection) {
      const dialogRef = this.dialog.open(InputDialog, {
        width: '300px',
        data: {
          title: 'Rename folder',
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
          label: 'New folder name',
          initiailValue: collection?.name,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          collection.name = result;
          console.log('Call api to change name');
        }
      });
    }
  }
}
