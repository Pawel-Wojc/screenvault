export interface Comment{
    id: string,
    username?: string,
    text: string,
    postedOn?: Date | string,
    hover?: boolean | null, 
}