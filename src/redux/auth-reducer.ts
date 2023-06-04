import {Dispatch} from "redux";
import {authAPI, ResultCodesEnum, securityAPI} from "../api/api";
import {RootThunkType, ThunkDispatchForm} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA"
const GET_CAPTCHA = "AUTH/GET_CAPTCHA"

const initialState: StateType =
  {

    id: 0,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:'',
  }
export type AuthType = {
  id: number ,
  email: string | null,
  login: string | null,
  isAuth: boolean,captchaUrl:string
}
type StateType = AuthType
type ActionType = AuthActionType
export type AuthActionType = ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getCaptcha>

const authReducer = (state: StateType = initialState, action: AuthActionType): StateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        isAuth: true,
        id: action.id,
        email: action.email,
        login: action.login,
      }
    case GET_CAPTCHA:
      return {...state, captchaUrl: action.captchaUrl};
    default:
      return state
  }
}

export const setAuthUserData = (id: number, email: string|null, login: string|null, isAuth: boolean) => {
  return {
    type: SET_USER_DATA,
    id,
    email,
    login,
    isAuth
  } as const
}

export const getCaptcha = (captchaUrl: string) => ({
  type: GET_CAPTCHA, captchaUrl
} as const)



export const getAuthUserData = () => {
  return  (dispatch: Dispatch<ActionType>) => {
    return  authAPI.me().then(data => {
      if (data.resultCode === 0) {
        dispatch(setAuthUserData(data.data.id, data.data.login, data.data.email, true))
      }
    })
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captchaUrl: string| null) => {
  return  async (dispatch:ThunkDispatchForm) => {
     await authAPI.login(email, password, rememberMe,captchaUrl).then((res) => {
         console.log(captchaUrl)
         switch (res.data.resultCode) {
             case ResultCodesEnum.Success:
                 dispatch(getAuthUserData())
                 break;
             case ResultCodesEnum.CaptchaIsRequired:
                 dispatch(getCaptchaURL())
                 break;
             default:
                 let message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
                 dispatch(stopSubmit('login', {_error: message}));
                 break;
         }

     })
  }
}
export const logout = (): RootThunkType => {
  return async (dispatch) => {
    await authAPI.logaut().then((res) => {
      console.log(res)
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(0, null, null, false))

      }
    })
  }
}
export const getCaptchaURL = (): RootThunkType => {
  return (dispatch) => {
    securityAPI.getCaptcha()
        .then(data => {
          dispatch(getCaptcha(data.data.url));
        })
        .catch((error) => {
          console.log(error);
        })
  }
}


export default authReducer