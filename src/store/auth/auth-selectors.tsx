import {RootStateType} from "../store";


export const selectIsAuth = (state: RootStateType) => state.auth.isAuth
export const selectLogin = (state: RootStateType) => state.auth.login
export const selectAuthUserId = (state: RootStateType) => state.auth.id
