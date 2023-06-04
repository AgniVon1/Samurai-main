import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {RootThunkType, ThunkDispatchForm} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA"

const initialState: StateType =
  {

    id: null,
    email: null,
    login: null,
    isAuth: false,
  }
export type AuthType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
}
type StateType = AuthType
type ActionType = ReturnType<typeof setAuthUserData>
export type AuthActionType = ReturnType<typeof setAuthUserData>

const authReducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        isAuth: true,
        id: action.id,
        email: action.email,
        login: action.login,
      }
    default:
      return state
  }
}

export const setAuthUserData = (id: number|null, email: string|null, login: string|null, isAuth: boolean) => {
  return {
    type: SET_USER_DATA,
    id,
    email,
    login,
    isAuth
  } as const
}


export const getAuthUserData = () => {
  return  (dispatch: Dispatch<ActionType>) => {
    return  authAPI.me().then(data => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(data.data.id, data.data.login, data.data.email, true))
      }
    })
  }
}

export const login = (email: string, password: string, rememberMe: boolean) => {
  return  async (dispatch:ThunkDispatchForm) => {
     await authAPI.login(email, password, rememberMe).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserData())
      }else {
        let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error:message}));
      }

    })
  }
}
export const logout = (): RootThunkType => {
  return async (dispatch) => {
    await authAPI.logaut().then((res) => {
      console.log(res)
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))

      }
    })
  }
}


export default authReducer