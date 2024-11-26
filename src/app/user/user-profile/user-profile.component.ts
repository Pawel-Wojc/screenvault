import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SimpleDialog } from '../../shared/simple-dialog/simple-dialog';
import { CollectionsComponent } from '../collections/collections.component';
<<<<<<< Updated upstream
//import { DragDropTestComponent } from '../drag-drop-test/drag-drop-test.component';

=======
import { MatButtonModule } from '@angular/material/button';
import { ChangePasswordDialog } from '../change-password-dialog/change-password-dialog';
>>>>>>> Stashed changes
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    CollectionsComponent,
<<<<<<< Updated upstream
  //  DragDropTestComponent,
=======
    MatMenuModule,
    MatButtonModule,
>>>>>>> Stashed changes
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  changePasword() {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '300px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User password changed');
      }
    });
  }
  profilePhotoPlaceholder: string = 'demo-avatar.png';
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  userPhoto = signal<string | ArrayBuffer | null>(this.profilePhotoPlaceholder);
  userEmail = signal('email');
  userName = signal('username');

  changeUserProfilePicture(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.files);
    if (target.files) {
      const file = target.files[0];
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg'
      ) {
        const reader = new FileReader();
        reader.onload = () => {
          this.userPhoto.set(reader.result);
        };
        reader.readAsDataURL(target.files[0]);
        this.fileInput.nativeElement.value = ''; //setting input to empty, then if we delete selected and select again same file, input will trigger change
        //call api
        console.log('call api to save user profile picture changes');
      } else {
        this.snackBar.open('Available types: png, jpg, jpeg', 'Close', {
          duration: 2000,
        });
      }
    }
  }

  deleteProfilePicture(event: Event) {
    if (this.userPhoto() !== this.profilePhotoPlaceholder) {
      const dialogRef = this.dialog.open(SimpleDialog, {
        width: '300px',
        data: {
          title: 'Delete Profile Picture',
          message: 'Are you sure you want to delete your profile picture?',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
          this.userPhoto.set(this.profilePhotoPlaceholder);
          console.log('Call api to delete photo');
        }
      });
    }
  }

  changeUserPassword() {
    //implementation??
  }
}
