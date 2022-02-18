// @ts-ignore
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from 'app/store'
import {ItemService} from 'api/api.service'
import {LOG_g} from "../../Constants/constants";
import {ActionError, ItemModel, ItemState} from "./itemModel";
import {Query, Status} from "../utils";

const initialState: ItemState={
    items:[],
    item:{},
    loadingStatus:Status.NORMAL,
    uploadStatus:Status.NORMAL,
    error:null,
    queryType:"",
}



const items = createSlice({
    name:'items',
    initialState,
    reducers:{
            queryStart(state, action: PayloadAction<string>){
                state.loadingStatus=Status.LOADING
                state.queryType=action.payload
            },
            fetchItemsSuccess(state, action: PayloadAction<ItemModel[]>) {
                // const { comments, issueId } = action.payload
                state.items=action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH
                state.error = null
            },
            getItemSuccess(state, action: PayloadAction<ItemModel>) {
                state.item= action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH_ONE
                state.error = null
            },
           createItemsSuccess(state, action: PayloadAction<ItemModel>) {
                // const { comments, issueId } = action.payload
                state.items= state.items.concat(action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.CREATE
                state.error = null
            },
            updateItemsSuccess(state, action: PayloadAction<ItemModel>){
                // const { comments, issueId } = action.payload
                let arry=[action.payload]
                state.items= state.items.map(ques=>arry.find(q=>q.id===ques.id)||ques)
                // state.items= state.items.map(ques=>action.payload.id===ques.id||ques)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.UPDATE
                state.error = null
            },
            deleteItemsSuccess(state, action: PayloadAction<string>) {
                state.items= state.items.filter(item=>item.id!==action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.DELETE
                state.error = null
            },
            queryFailure(state, action: PayloadAction<ActionError>) {
                state.loadingStatus = Status.ERROR
                state.error = action.payload.error
                state.queryType=action.payload.queryType
            }
        }
})

export const {
    queryStart,
    fetchItemsSuccess,
    getItemSuccess,
    createItemsSuccess,
    updateItemsSuccess,
    deleteItemsSuccess,
    queryFailure
} = items.actions

export default items.reducer

const getResponseData=(value)=> value.data.message.data

export const fetchItems = (): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH))
        const items = await ItemService.fetch({})
        console.log("quest", items)
        let questns:ItemModel[]=getResponseData(items)
        console.log("quest==/", questns)
        dispatch(fetchItemsSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH}))
    }
}

export const getItem = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH_ONE))
        const items = await ItemService.get(id)
        let questns:ItemModel=getResponseData(items)
        dispatch(getItemSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH_ONE}))
    }
}


export const createItems = (item): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.CREATE))
        const items = await ItemService.create(item)
        let itm:ItemModel=getResponseData(items)
        dispatch(createItemsSuccess(itm))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.CREATE}))
    }
}

export const updateItems = (id:string, item:ItemModel): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.UPDATE))
        const items = await ItemService.update(id, item)
        let qstn:ItemModel=getResponseData(items)
        dispatch(updateItemsSuccess(qstn))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.UPDATE}))
    }
}

export const deleteItems = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.DELETE))
        const item = await ItemService.delete(id)
        dispatch(deleteItemsSuccess(id))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.DELETE}))
    }
}

