import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private httpClient = inject(HttpClient);
  private getUserDetailsUrl =
    myGlobals.apiLink + '/authentication/noAuth/whoAmI';

  private changeUserProfilePictureUrl = myGlobals.apiLink + '/user/changePfp';

  public getUserDetails(): Observable<any> {
    return this.httpClient.get(this.getUserDetailsUrl);
  }

  public changeUserProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('newImage', file);
    return this.httpClient.put(this.changeUserProfilePictureUrl, formData);
  }
}
