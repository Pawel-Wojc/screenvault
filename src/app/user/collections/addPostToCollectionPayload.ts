
export class AddPostToCollectionPayload{
    postId: string;
    collectionId: string;

    constructor(postId: string, collectionId: string){
        this.postId = postId;
        this.collectionId = collectionId;
    }
}

