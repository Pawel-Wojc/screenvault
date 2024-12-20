import { Rating } from "./wall-item/rating";

export interface Post{
    id: string,
    title: string,
    imageUrl: string,
    posterUsername: string,
    viewCount: number,
    score: number,
    commentCount: number,
    myScore?: Rating,
}