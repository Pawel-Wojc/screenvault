import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRoleService {
  private whoAmIUrl: string = myGlobals.apiLink  + "/authentication/noAuth/whoAmI";

  private httpClient = inject(HttpClient);
  
  

  public getRole(): Observable<any>{
    
    return this.httpClient.get(this.whoAmIUrl);
     
  }

}
