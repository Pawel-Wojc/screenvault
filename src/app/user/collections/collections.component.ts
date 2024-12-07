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

interface CollectionForProfile {
  id: string;
  name: string;
  posts: Post[];
}
interface Post {
  id: string;
  title: string;
  imageUrl: string;
  isPublic: boolean;
}
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
  openedFolders: CollectionForProfile[] = [];
  userCollections: CollectionForProfile[] = [];

  ngOnInit() {
    this.getUsersCollections();
  }
  getUsersCollections() {
    this.collectionsService.getUsersCollectionsForProfile().subscribe((res) => {
      this.userCollections = res;
    });
  }

  deletePost(postID: string) {
    this.collectionsService.deletePost(postID).subscribe((res) => {});
  }

  onDrop(event: any) {
    if (event.previousContainer === event.container) {
      //if moving inside the same container
      let collection = this.userCollections.find(
        (c) => c === event.container.data
      );
      if (collection) {
        moveItemInArray(
          collection.posts,
          event.previousIndex,
          event.currentIndex
        );
      }
      //api call to change order
    } else {
      let currentCollection: CollectionForProfile | undefined =
        this.openedFolders.find(
          (c) => c.id === event.previousContainer.data.id
        );
      let targetCollection: CollectionForProfile | undefined =
        this.openedFolders.find((c) => c.id === event.container.data.id);

      if (currentCollection && targetCollection) {
        let post = currentCollection.posts[event.previousIndex];
        this.collectionsService.changePostCollection(
          post.id,
          currentCollection.id,
          targetCollection.id
        );
        transferArrayItem(
          currentCollection.posts,
          targetCollection.posts,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  deleteUserCollection(id: string) {
    this.collectionsService
      .deleteUserCollections(id.toString())
      .subscribe((results) => {});
    this.userCollections = this.userCollections.filter(
      (collection) => collection.id !== id
    );
    this.openedFolders = this.openedFolders.filter(
      (collection) => collection.id !== id
    );
  }
  ToogleFolder(folderToToogle: CollectionForProfile) {
    if (this.openedFolders) {
      if (
        this.openedFolders.find(
          (f: CollectionForProfile) => f.id === folderToToogle.id
        )
      ) {
        this.openedFolders = this.openedFolders.filter(
          (f: CollectionForProfile) => f.id !== folderToToogle.id
        );
        return;
      }
    }
    if (this.openedFolders) {
      this.openedFolders.push(folderToToogle);
    } else {
      this.openedFolders = [folderToToogle];
    }
  }

  addNewFolder() {
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
        this.collectionsService.addCollection(result).subscribe((response) => {
          if (response.success) {
            var newFolder = {
              id: response.collection.id,
              name: response.collection.name,
              posts: response.collection.posts as Array<Post>,
            };
            this.userCollections.push(newFolder);
            this.getUsersCollections();
          }
        });
      }
    });
  }
  renameFolder(id: string) {
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
        }
      });
    }
  }
}
