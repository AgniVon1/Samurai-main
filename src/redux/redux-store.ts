import {applyMiddleware, combineReducers, createStore} from 'redux'

import profileReducer, {ProfileActionType} from "./profile-reducer";
import dialogReducer, {DialogActionType} from "./dialog-reducer";
import usersReducer, {UserActionType} from "./users-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReducer, stopSubmit} from 'redux-form'

const reducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
    form: formReducer
})

export type RootActionType = UserActionType | ProfileActionType | AuthActionType|DialogActionType
export type RootStateType = ReturnType<typeof reducer>
export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>

// type form
export type ThunkDispatchForm = ThunkDispatch<RootStateType, unknown, ReturnType<typeof stopSubmit>>
const store = createStore(reducer,applyMiddleware(thunk));

// @ts-ignore
Window.store = store
export default store