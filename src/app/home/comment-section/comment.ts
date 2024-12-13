export interface Comment{
    id: string,
    username?: string,
    text: string,
    userPfpUrl: string,
    postedOn?: Date | string,
    hover?: boolean | null, 
}