export class PostToPublic {
    title: string;
    postedOn: Date;
    isPublic: boolean;

    constructor(title: string, isPublic: boolean){
        this.title = title;
        this.postedOn = new Date();
        this.isPublic = isPublic;
    }
}
