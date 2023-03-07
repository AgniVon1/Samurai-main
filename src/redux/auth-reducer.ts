import {Dispatch} from "redux";
import {API, authAPI} from "../api/api";
import {setUsers, togglelIsFetching} from "./users-reducer";

const SET_USER_DATA = "AUTH/SET_USER_DATA"

const initialState:StateType =
    {
        resultCode: 0,
        messages: [],
        data: {
            id: 2,
            email: 'blabla@bla.bla',
            login: 'samurai',
        },
        isAuth:false,
    }
export type AuthType = {
    resultCode: number
    messages: Array<string>,
        data: {
        id: number,
        email: string,
        login: string,
    },
    isAuth:boolean,
}
type StateType = AuthType
type ActionType =  ReturnType<typeof setAuthUserData>

const authReducer = (state: StateType = initialState , action: ActionType):StateType  => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                isAuth:true,
                data:{
                    id: action.id,
                    email: action.email,
                    login: action.login,
                }
            }
        default:
            return state
    }
}

export const setAuthUserData = (id:number,email:string,login:string) => {
    return {
        type: SET_USER_DATA,
        id,
        email,
        login,
    } as const
}
export const getAuthUserDataTC = () => {
    return async (dispatch : Dispatch<ActionType>) => {
       await authAPI.me().then(data => {
            if (data.resultCode === 0)  {
                dispatch(setAuthUserData(
              data.data.id,
              data.data.login,
              data.data.email))
            }
        })
    }
}


export default authReducer