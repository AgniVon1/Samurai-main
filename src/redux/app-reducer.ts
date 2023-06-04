import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {getAuthUserData, setAuthUserData} from "./auth-reducer";
import {RootThunkType} from "./redux-store";

const SET_INITIALIZED = "APP/SET_INITIALIZED"

const initialState: AppInitStateType = {
    initialized: false,
}

type AppInitStateType = {
    initialized: boolean,
}
export type AppActionType = ReturnType<typeof setInit>

export const appReducer = (state: AppInitStateType = initialState, action: AppActionType): AppInitStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const setInit = () => {
    return {
        type: SET_INITIALIZED,
    } as const
}

export const initializeApp = () => {
    return async (dispatch:Dispatch<any>) => {
        const prom = dispatch(getAuthUserData())
        Promise.all([prom]).then(()=>{
            dispatch(setInit())
        })
    }
}


