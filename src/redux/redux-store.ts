import {applyMiddleware, combineReducers, createStore} from 'redux'

import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
    form: formReducer
})


export type RootStateType = ReturnType<typeof reducer>
const store = createStore(reducer,applyMiddleware(thunk));

// @ts-ignore
Window.store = store
export default store