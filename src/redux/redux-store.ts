import {applyMiddleware, combineReducers, compose, createStore} from 'redux'

import profileReducer, {ProfileActionType} from "./profile-reducer";
import dialogReducer, {DialogActionType} from "./dialog-reducer";
import usersReducer, {UserActionType} from "./users-reducer";
import authReducer, {AuthActionType} from "./auth-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReducer, stopSubmit} from 'redux-form'
import {AppActionType, appReducer} from "./app-reducer";

const reducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    usersPage : usersReducer,
    auth: authReducer,
    app:appReducer,
    form: formReducer,
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootActionType = UserActionType | ProfileActionType | AuthActionType|DialogActionType |AppActionType
export type RootStateType = ReturnType<typeof reducer>
export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>

// type form
export type ThunkDispatchForm = ThunkDispatch<RootStateType, unknown, ReturnType<typeof stopSubmit>>
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
Window.store = store
export default store