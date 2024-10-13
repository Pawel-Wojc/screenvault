import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private file: File | null = null;

  setFile(file: File | null) {
    this.file = file;
  }

  getFile(): File | null {
    return this.file;
  }

  clearFile() {
    this.file = null;
  }

}
