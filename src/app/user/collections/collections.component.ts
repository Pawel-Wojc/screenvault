import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputDialog } from '../../shared/input-dialog/input-dialog';
import { CommonModule } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { CollectionsService } from './collections.service';
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
  private collectionsService = inject(CollectionsService);
  private dialog = inject(MatDialog);
  openedFolders: any[] = [];
  ngOnInit() {
    this.collectionsService.getUsersCollections().subscribe((res) => {
      this.userCollections = res.collectionList;
    });
  }
  userCollections: any[] = [];

  onDrop(event: any) {
    if (event.previousContainer === event.container) {
      //if moving inside the same container
      let array = this.userCollections.find((c) => c === event.container.data);
      if (array) {
        moveItemInArray(array.photos, event.previousIndex, event.currentIndex);

        //this.collectionsService.changePostCollection()
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
    this.collectionsService
      .deleteUserCollections(id.toString())
      .subscribe((results) => {
        console.log(results);
      });
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
        this.collectionsService
          .addCollection(result)
          .subscribe((collection) => {});
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
