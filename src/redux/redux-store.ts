import {combineReducers, createStore} from 'redux'

import profileReducer, {ProfilePageType} from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer, {UsersType} from "./users-reducer";
import {DialogPageType} from "./state";

export type rootStateType  = {
    dialogPage: DialogPageType,
    profilePage: ProfilePageType,
    usersPage: UsersType
}


const reducers = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
})
const store = createStore(reducers);

export default store