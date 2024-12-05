import { Rating } from "./rating";

export class RatingPayload{
    postId: string;
    score: Rating;
    
    constructor(postId: string, score: Rating){
        this.postId = postId;
        this.score = score;
    }
}