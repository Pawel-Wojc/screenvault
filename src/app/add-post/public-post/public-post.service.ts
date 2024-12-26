import { inject, Injectable } from '@angular/core';
import * as myGlobals from '../../global';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostToPublic } from '../post-to-public';

@Injectable({
    providedIn: 'root',
})

export class PublicPostService{
    private httpClient = inject(HttpClient);
    private publicPostUrl = myGlobals.apiLink + '/post/noAuth/uploadPost';
    private validateAndGetTagsUrl = myGlobals.apiLink + '/verification/noAuth/verifyAndGetTags';
    
    public publicPost(img: File, post: PostToPublic): Observable<any>{

        const fileWithType = new Blob([img], { type: this.getMimeType(img.name) });

        const formData = new FormData();
        formData.append('image', fileWithType);
        formData.append('postRequest', JSON.stringify(post));
        
        
        return this.httpClient.post<any>(
            this.publicPostUrl,
            formData,       
        );
    }

    public validateAndGetTags(img: File): Observable<any>{
        const fileWithType = new Blob([img], { type: this.getMimeType(img.name) });

        const formData = new FormData();
        formData.append('image', fileWithType);

        return this.httpClient.post(this.validateAndGetTagsUrl, formData);
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