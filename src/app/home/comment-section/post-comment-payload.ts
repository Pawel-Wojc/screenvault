import { NewComment } from './new-comment';

export class PostCommentPayload{
    comment: NewComment;
    postId: string;

    constructor(comment: NewComment, postId: string){
        this.comment = comment;
        this.postId = postId;
    }
}