import {DialogResponse, dialogsAPI} from "../../api/dialogs/dialogs-api";
import {Dispatch} from "redux";
import {RootStateType, RootThunkType} from "../store";
import {ThunkDispatch} from "redux-thunk";

/*const SEND_NEW_MESS = "SEND-MESSAGE"

export const sendNewMessAC = (newMess:string) => {
    return {
        type: SEND_NEW_MESS,newMess
    } as const
}
export type sendNewMessActionType = ReturnType<typeof sendNewMessAC>*/

const SET_ALL_DIALOGS = "DIALOG/SET_ALL_DIALOGS"
const DIALOG_IS_FETCHING = "DIALOG/TOGGLE_IS_FETCHING"

const initialState: DialogsStateType =
    {
        dialogs: [
        ] as DialogResponse[],
        isFetching: false,
    }

const dialogReducer = (state: DialogsStateType = initialState, action: DialogActionType): DialogsStateType => {
    switch (action.type) {
        case SET_ALL_DIALOGS:
            return {
                ...state,dialogs: [...action.dialogs]
            }
        case DIALOG_IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        default:
            return state
    }
}

export const fetchDialogs = () => {
    return async (dispatch: Dispatch<DialogActionType>,getState: () => RootStateType) => {
        dispatch(dialogIsFetching(true))
        const res = await dialogsAPI.getAllDialogs()
        dispatch(setAllDialogs(res.data))
        dispatch(dialogIsFetching(false))
    }
}


export const setAllDialogs = (dialogs:DialogResponse[]) => {
    return {
        type: SET_ALL_DIALOGS,
        dialogs,
    } as const
}

export type DialogIsFetching = ReturnType<typeof dialogIsFetching>
export const dialogIsFetching = (value: boolean) => {return {type: DIALOG_IS_FETCHING, value} as const}


export type DialogActionType = ReturnType<typeof setAllDialogs> |
    DialogIsFetching

type DialogsStateType = {
    dialogs: Array<DialogResponse>,
    isFetching:boolean,
}

export default dialogReducer