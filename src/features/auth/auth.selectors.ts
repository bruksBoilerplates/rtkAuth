import {UserState} from "../users/users.models";

export const selectAuth = (state) => {
    return state.auth;
}
export const IsAuthenticated = (state):UserState => {
    return selectAuth(state).authenticated;
}

