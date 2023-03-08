import {applyMiddleware, combineReducers, createStore} from 'redux'

import profileReducer, {ProfileActionType} from "./profile-reducer";
import dialogReducer, {DialogActionType} from "./dialog-reducer";
import usersReducer, {UserActionType} from "./users-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
    form: formReducer
})

export type RootActionType = UserActionType | ProfileActionType | AuthActionType|DialogActionType
export type RootStateType = ReturnType<typeof reducer>
const store = createStore(reducer,applyMiddleware(thunk));

// @ts-ignore
Window.store = store
export default store