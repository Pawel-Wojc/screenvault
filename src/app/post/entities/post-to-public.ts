export class PostToPublic {
    title: string;
    postedOn: Date;

    constructor(title: string){
        this.title = title;
        this.postedOn = new Date();
    }
}
