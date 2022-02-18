export interface ItemFilter{
    search?:string
    category?:string
}

export interface ItemModel {
    id: string
    name: string
    imageCover?:string
    description?:string


}
// Type of books could be: Leadership, grace, prayer, word,

export interface ItemState {
    filters?:ItemFilter,
    page?:0
    items?: ItemModel[],
    item?: ItemModel | {},
    loadingStatus: string,
    uploadStatus?:string
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}


