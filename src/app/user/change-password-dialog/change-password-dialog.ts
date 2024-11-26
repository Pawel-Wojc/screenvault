import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
  ],
})
export class ChangePasswordDialog {
  readonly dialogRef = inject(MatDialogRef<ChangePasswordDialog>);
  data = inject(MAT_DIALOG_DATA);
  currentPassword = signal('');
  newPassword = signal('');
  retypeNewPassword = signal('');

  //call api to change password
}
