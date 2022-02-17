
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from '../../app/store'
import {AuthService} from '../../api/api.service'
import {ActionError, UserModel, UserState} from "../users/users.models";
import Routes from "../../Constants/routes";
import { message } from 'antd';
import axios from "axios";
import {LOG_g, Query, Status} from "../utils";
import jwtDecode from "jwt-decode";
import {destroyToken, getToken, saveTokenToLocalStorage} from "../../api/jwt.service";


const initialState: UserState= {
        authenticated: false,
        error:null,
        token:"",
        loadingStatus:Status.NORMAL,
        queryType:"",
        //user related
        isAdmin:false,
        currentUser: null,
}

const auth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        queryStart(state, action: PayloadAction<string>){
            state.loadingStatus=Status.LOADING
            state.queryType=action.payload
        },
        signUpSuccess(state, action: PayloadAction<UserModel>) {
            // const { comments, issueId } = action.payload
            state.currentUser=action.payload
            state.loadingStatus = Status.SUCCESS
            state.queryType=Query.SIGNUP
            state.error = null
        },
        loginSuccess(state, action: PayloadAction<UserModel>) {
            // const { comments, issueId } = action.payload
            state.currentUser=action.payload
            state.authenticated=true
            state.loadingStatus = Status.SUCCESS
            state.queryType=Query.LOGIN
            state.error = null
        },
        queryFailure(state, action: PayloadAction<ActionError>) {
            state.loadingStatus = Status.ERROR
            state.error = action.payload.error
            state.queryType=action.payload.queryType

        },
        logout(state){
            state=initialState
        }
    }
})

export const {
    queryStart,
    signUpSuccess,
    loginSuccess,
    queryFailure,
    logout
} = auth.actions

export default auth.reducer

//getting the user data from the api response
const getResponseData=(value)=> value.data.message.data

export const login = (usr:UserModel, history, checked:boolean): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.LOGIN))
        const usrRes = await AuthService.login(usr)
        // dispatch(LOG_g("data", usrRes.data.toString()))

        let user:UserModel=getResponseData(usrRes)
        dispatch(loginSuccess(user))

        axios.defaults.headers.common['Authorization'] = usrRes.data.token;

        if (checked === true) {
            saveTokenToLocalStorage(usrRes.data.token, user);
        }

        if (user.role === "admin") history.push(Routes.ADMIN)
        else
            history.push("/");
        return

    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.LOGIN}))
    }
}

export const signup = (usr:UserModel, history): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.SIGNUP))
        const questions = await AuthService.signup(usr)

        let user:UserModel=getResponseData(questions)
        dispatch(signUpSuccess(user))
        history.push(Routes.LOGIN);
        message.success('You Are Verified Successfully, Please LoginWithEmail Using Your phone and Password');

    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.SIGNUP}))
    }
}

export const logoutUser = () => (dispatch) => {
    destroyToken()
    delete axios.defaults.headers.common['Authorization'];
    dispatch(logout());
    window.location.href = Routes.LOGIN;
};


export const CheckExpiredToken=()=>(dispatch) =>{
    const objectToken = getToken();

    // dispatch(LOG_g("checking token", objectToken))
    if (objectToken) {
        try{
            const decodedToken = jwtDecode(objectToken.token)
            let user:UserModel=objectToken.user
            // dispatch(LOG_g("decoded Token", decodedToken))
            // @ts-ignore
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(logoutUser());
            } else {
                dispatch(loginSuccess(user));
                axios.defaults.headers.common['Authorization'] = objectToken.token;
            }
        }catch (e){
            console.log("e", e)
       }

    }else {
        dispatch(logout());
    }
}
