export class PostToPublic {
    title: string;
    public: boolean;

    constructor(title: string, isPublic: boolean){
        this.title = title;
        this.public = isPublic;
    }
}
