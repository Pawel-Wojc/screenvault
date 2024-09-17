import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  proxyFile: File | null = null;

  //method for submitting files
  subFiles(fileList: FileList) {
    this.proxyFile = fileList[0];
  }

  getFileToEdit(): File | null {
    return this.proxyFile as File;
  }

  constructor() {}
}
