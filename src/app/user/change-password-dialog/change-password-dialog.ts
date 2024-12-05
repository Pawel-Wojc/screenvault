import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangePasswordDialogService } from './change-password-dialog-service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogActions,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
  ],
})
export class ChangePasswordDialog {
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<ChangePasswordDialog>) {
    this.form = new FormGroup(
      {
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  chenagePasswordDialogService = inject(ChangePasswordDialogService);

  passwordIsNotCorrect = signal(false);

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    // console.log(password === confirmPassword);
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  };

  onCancel() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.form.valid) {
      const { oldPassword, newPassword } = this.form.value;
      this.chenagePasswordDialogService
        .changeUserPassword(oldPassword, newPassword)
        .subscribe({
          next: (response) => {
            this.chenagePasswordDialogService.openSnackBar('Password changed');
            this.dialogRef.close();
          },
          error: (error) => {
            if (error.status === 401) {
              this.form.get('oldPassword')?.setErrors({ wronPassword: true });
            }
          },
        });

      //
    } else {
      this.form.markAllAsTouched(); // Show errors if validation fails
    }
  }
}
