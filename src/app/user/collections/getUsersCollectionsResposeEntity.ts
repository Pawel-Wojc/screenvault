import { Collection } from "./collection";

export interface GetUsersCollectionsResposeEntity {
    message: string,
    success: boolean,
    collectionList: Collection[]
}