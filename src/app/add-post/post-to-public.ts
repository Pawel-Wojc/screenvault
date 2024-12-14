export class PostToPublic {
    title: string;
    tags: string[];
    public: boolean;

    constructor(title: string, tags: string[], isPublic: boolean){
        this.title = title;
        this.tags = tags;
        this.public = isPublic;
    }
}
