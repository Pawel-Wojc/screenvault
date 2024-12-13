export interface Comment{
    id: string,
    username?: string,
    text: string,
    userPfrUrl: string | undefined,
    postedOn?: Date | string,
    hover?: boolean | null, 
}