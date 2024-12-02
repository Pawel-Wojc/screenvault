import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRoleService {
  private whoAmIUrl: string = myGlobals.apiLink  + "/authentication/noAuth/whoAmI";

  private httpClient = inject(HttpClient);
  
  public getRole(): Observable<any>{
    /*
    const headers = new HttpHeaders({
     // 'Content-Type': 'application/json',
      //'Authorization': 'Bearer your-token-if-applicable'
    });
    */

    return this.httpClient.get(this.whoAmIUrl, {withCredentials: true/*, headers*/});
     
  }

  public async ifUserLogged() {
    try{
      const response = await firstValueFrom(this.getRole());
      console.log(response);
      
      if(response.role != "ANONYMOUS"){
      return true;
      }
      
      return false;
    }
    catch (err){
      return false;
    }
  }

}
