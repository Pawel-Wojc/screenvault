import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordDialogService {
  private httpClient = inject(HttpClient);
  private checkUserPasswordUrl = myGlobals.apiLink + '/user/changePassword';
  private snackBar = inject(MatSnackBar);
  public changeUserPassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const passwords = {
      newPassword: newPassword,
      oldPassword: currentPassword,
    };
    return this.httpClient.patch<any>(this.checkUserPasswordUrl, passwords);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
