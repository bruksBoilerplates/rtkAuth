import {ItemModel, ItemState} from "./itemModel";


export const itemState = (state):ItemState => {
    return state.items;
}

export const selectItems = (state):ItemModel[] => {
    return itemState(state).items;
}
