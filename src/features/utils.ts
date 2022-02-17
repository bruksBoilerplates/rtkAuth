


export const Status = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    NORMAL: 'NORMAL',
    LOADING: 'LOADING',
}
export const Query = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ONE: 'FETCH_ONE',
    FETCH: "FETCH",
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN"
}



//======================
export const removeItem = (
    itemsList,
    newItem
) => {
    const exists = itemsList.find(itm => itm.id === newItem.id);

    if (exists) {
        itemsList = itemsList.filter(item => item.id !== newItem.id);
    }
    return itemsList;
};

export const updateList = (
    lists,
    item
) => {
    const exists = lists.find(item => item.id === item.id);

    if (exists) {
        lists = lists.map(itm =>
            itm.id === item.id ? item : itm
        );
    }
    return lists;
};

export const LOG_g = (name, value) => ({
    type: `LOGGING-->${name}`,
    name,
    value
});
