export interface Comment{
    id: string,
    userName: string,
    text: string,
    postedOn: Date | string,
    hover?: boolean | null, 
}