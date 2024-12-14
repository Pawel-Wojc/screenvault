import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {

  private getTagsUrl: string = myGlobals.apiLink  + "/authentication/noAuth/whoAmI";

  private file: File | null = null;
  private httpClient = inject(HttpClient);

  //Validation parameters
  //Max file size in MiB
  MiB = 10;
  //available file extensions
  extensions = ['jpg', 'jpeg', 'svg', 'png', 'webp'];

  public setFile(file: File | null) {
    this.file = file;
  }

  public getFile(): File | null {
    return this.file;
  }

  public clearFile() {
    this.file = null;
  }
  
  //returns true if file passes validation
  public validateFile(file: File): boolean{
    if (file.size > (this.MiB * 1048576)){
      return false;
    }
        
    if (!this.extensions.includes( file.name.split('.').at(-1) as string) ){
      return false;
    }
    
    return true;
  }

  public getTags(): Observable<any> {
    return this.httpClient.get(this.getTagsUrl);
  }
}
