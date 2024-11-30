import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {
  private whoAmIUrl: string = myGlobals.apiLink  + "/authentication/noAuth/whoAmI";

  private httpClient = inject(HttpClient);

  public isLogged(): boolean{
    this.httpClient.get(this.whoAmIUrl).subscribe({
      next: (response) => {
        return true;
      },
      error: (error) => {
        return false; 
      } 
    });
     return false;
  }

}
