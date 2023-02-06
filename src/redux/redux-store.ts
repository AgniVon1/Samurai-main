import {combineReducers, createStore} from 'redux'

import profileReducer, {ProfilePageType} from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer, {UsersType} from "./users-reducer";
import {DialogPageType} from "./state";
import authReducer, {AuthType} from "./auth-reducer";

export type rootStateType  = {
    dialogPage: DialogPageType,
    profilePage: ProfilePageType,
    usersPage: UsersType,
    auth:AuthType,
}

const reducers = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
})
const store = createStore(reducers);

export default store