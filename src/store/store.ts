import {applyMiddleware, compose, createStore} from 'redux'


import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {stopSubmit} from 'redux-form'

import {reducer} from "./reducer";
import {UserActionType} from "./users/users-reducer";
import {ProfileActionType} from "./profile/profile-reducer";
import {AuthActionType} from "./auth/auth-reducer";
import {DialogActionType} from "./dialog/dialog-reducer";
import {AppActionType} from "./app/app-reducer";


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootActionType = UserActionType | ProfileActionType | AuthActionType | DialogActionType | AppActionType
export type RootStateType = ReturnType<typeof reducer>
export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionType>
export type ThunkDispatchForm = ThunkDispatch<RootStateType, unknown, ReturnType<typeof stopSubmit>>
export type AppThunkDispatch = ThunkDispatch<RootStateType, unknown, RootActionType>

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
Window.store = store
export default store