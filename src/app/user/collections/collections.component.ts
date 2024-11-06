import { Component, inject, NgModule, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputDialog } from '../../shared/input-dialog/input-dialog';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, MatTooltip],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css',
})
export class CollectionsComponent {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private currentOpenedFolder = signal<number | undefined>(undefined);
  currentFolder = signal<
    { name: string; url: string; status: string }[] | undefined
  >(undefined);
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

  deleteUserCollection(id: number) {
    ///API CALL
    this.userCollections = this.userCollections.filter(
      (collection) => collection.id !== id
    );
  }
  openFolder(id: number) {
    if (this.currentOpenedFolder() == id) {
      this.currentFolder.set(undefined);
      this.currentOpenedFolder.set(undefined);
      return;
    }
    this.currentFolder.set(
      this.userCollections.find((folder) => folder.id === id)?.photos
    );
    if (this.currentFolder()?.length === 0) {
      this.currentFolder.set(undefined);
      this.snackBar.open('No photos in this folder', 'Close', {
        duration: 2000,
      });
    } else {
      this.currentOpenedFolder.set(id);
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
