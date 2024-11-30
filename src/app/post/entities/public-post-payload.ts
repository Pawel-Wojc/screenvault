import { PostToPublic } from './post-to-public'; 

export class PublicPostPayload {
    post: PostToPublic;
    isPublic: boolean;

    constructor(post: PostToPublic, isPublic: boolean){
        this.post = post;
        this.isPublic = isPublic; 
    }
}