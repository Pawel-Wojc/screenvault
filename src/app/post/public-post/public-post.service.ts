import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PublicPostPayload } from '../entities/public-post-payload';

@Injectable({
    providedIn: 'root',
})

export class PublicPostService{
    private httpClient = inject(HttpClient);
    private url = myGlobals.apiLink + '/post/noAuth/uploadPost';
    
    public publicPost(img: File, post: PublicPostPayload): Observable<any>{

        const fileWithType = new Blob([img], { type: this.getMimeType(img.name) });
        
        const formData = new FormData();
        formData.append('image', fileWithType);
        formData.append('postRequest', JSON.stringify(post));
        
        
        return this.httpClient.post<any>(
            this.url,
            formData,       
        );
    }
  
    private getMimeType(fileName: string): string | undefined {
        const extension = fileName.split('.').pop()?.toLowerCase();
      
        const mimeTypes: { [key: string]: string } = {
          png: 'image/png',
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          gif: 'image/gif',
          bmp: 'image/bmp',
          webp: 'image/webp',
          svg: 'image/svg+xml',
        };
      
        return extension ? mimeTypes[extension] : undefined;
      }
}