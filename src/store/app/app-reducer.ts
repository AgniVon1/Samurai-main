import {Dispatch} from "redux";
import {getAuthUserData} from "../auth/auth-reducer";

const SET_INITIALIZED = "APP/SET_INITIALIZED"
const SET_ERROR = "APP/SET_ERROR"

const initialState: AppInitStateType = {
    initialized: false,
    errorMessage: "",
}

export const appReducer = (state: AppInitStateType = initialState, action: AppActionType): AppInitStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export const initializeApp = () => {
    return async (dispatch: Dispatch<any>) => {
        const prom = dispatch(getAuthUserData())
        Promise.all([prom]).then(() => {
            dispatch(setInit())
        })
    }
}

export const setInit = () => {return {type: SET_INITIALIZED,} as const}
export const setErrorMessage = (errorMessage: string | null) => {return {type: SET_ERROR, errorMessage} as const}

export type AppActionType = ReturnType<typeof setInit>
    | ReturnType<typeof setErrorMessage>

type AppInitStateType = {
    initialized: boolean, errorMessage: string | null,
}