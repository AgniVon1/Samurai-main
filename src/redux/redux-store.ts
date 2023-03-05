import {applyMiddleware, combineReducers, createStore} from 'redux'

import profileReducer, {ProfilePageType} from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer, {UsersType} from "./users-reducer";
import {DialogPageType} from "./state";
import authReducer, {AuthType} from "./auth-reducer";
import thunk from "redux-thunk";

export type rootStateType  = {
    dialogPage: DialogPageType,
    profilePage: ProfilePageType,
    usersPage: UsersType,
    auth:AuthType,
}

const reducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
})


export type RootStateType = ReturnType<typeof reducer>
const store = createStore(reducer,applyMiddleware(thunk));

export default store