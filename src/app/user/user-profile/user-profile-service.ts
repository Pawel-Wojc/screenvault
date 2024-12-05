import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private httpClient = inject(HttpClient);
  private getUserDetailsUrl =
    myGlobals.apiLink + '/authentication/noAuth/whoAmI';
  private changeUserPasswordUrl = myGlobals.apiLink + '/user/changePassword';

  public getUserDetails(): Observable<any> {
    return this.httpClient.get(this.getUserDetailsUrl);
  }

  public changeUserPassword(newPassword: string): Observable<any> {
    const data = { newPassword: newPassword };
    return this.httpClient.post(this.changeUserPasswordUrl, data);
  }
}
