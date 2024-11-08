import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialog {
  readonly dialogRef = inject(MatDialogRef<SimpleDialog>);
  data = inject(MAT_DIALOG_DATA);
}
