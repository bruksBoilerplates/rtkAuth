import { combineReducers } from 'redux'


import authReducer from '../features/auth/auth.reducer'



const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`

    auth:authReducer,


})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer