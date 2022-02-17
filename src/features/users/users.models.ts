import {Status} from "../utils";


export interface UserModel {
    email?: string
    password?: string
    idToken?:string
    phone?:string


    firstname? :string
    lastname? :string
    role?:string
}

export interface UserState {
    authenticated: boolean,
    error:Error,
    token:string,

    loadingStatus:string,
    queryType:string

    //user related
    isAdmin:false,
    currentUser?: UserModel,
}

export interface ActionError{
    error:Error,
    queryType:string
}
