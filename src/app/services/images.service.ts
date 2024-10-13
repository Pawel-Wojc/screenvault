import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private file: File | null = null;

  //Validation parameters
  //Max file size in MiB
  MiB = 10;
  //available file extensions
  extensions = ['jpg', 'jpeg', 'svg', 'png', 'webp'];

  setFile(file: File | null) {
    this.file = file;
  }

  getFile(): File | null {
    return this.file;
  }

  clearFile() {
    this.file = null;
  }
  
  //returns true if file passes validation
  validateFile(file: File): boolean{
    if (file.size > (this.MiB * 1048576)){
      return false;
    }
        
    if (!this.extensions.includes( file.name.split('.').at(-1) as string) ){
      return false;
    }
    
    return true;
  }
}
