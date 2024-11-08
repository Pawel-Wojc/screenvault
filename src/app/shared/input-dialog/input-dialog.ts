import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './input-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, FormsModule],
})
export class InputDialog {
  readonly dialogRef = inject(MatDialogRef<InputDialog>);
  data = inject(MAT_DIALOG_DATA);
  input = signal(this.data.initiailValue);
}
