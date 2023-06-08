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
const SET_CURRENT_DIALOG = "DIALOG/SET_CURRENT_DIALOG"

const initialState: DialogsStateType =
    {
        dialogs: [] as DialogResponse[],
        currentDialog: {
            id: 0,
            userName: '',
            hasNewMessages: false,
            lastDialogActivityDate: "",
            lastUserActivityDate: "",
            newMessagesCount: 0,
            photos: {
                small: null,
                large: null
            }
        },
        isFetching: false,
    }

const dialogReducer = (state: DialogsStateType = initialState, action: DialogActionType): DialogsStateType => {
    switch (action.type) {
        case SET_ALL_DIALOGS:
            return {
                ...state, dialogs: [...action.dialogs]
            }
        case DIALOG_IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case SET_CURRENT_DIALOG:
            return {
                ...state,
                currentDialog: {...action.dialog}
            }
        default:
            return state
    }
}

export const fetchDialogs = () => {
    return async (dispatch: Dispatch<DialogActionType>, getState: () => RootStateType) => {
        dispatch(dialogIsFetching(true))
        const res = await dialogsAPI.getAllDialogs()
        dispatch(setAllDialogs(res.data))
        dispatch(dialogIsFetching(false))
    }
}


export const setAllDialogs = (dialogs: DialogResponse[]) => {
    return {
        type: SET_ALL_DIALOGS,
        dialogs,
    } as const
}

export const setCurrentDialog = (dialog: DialogResponse) => {
    return {
        type: SET_CURRENT_DIALOG,
        dialog,
    } as const
}

export type DialogIsFetching = ReturnType<typeof dialogIsFetching>
export const dialogIsFetching = (value: boolean) => {
    return {type: DIALOG_IS_FETCHING, value} as const
}


export type DialogActionType = ReturnType<typeof setAllDialogs> |
    ReturnType<typeof setCurrentDialog> |
    DialogIsFetching

type DialogsStateType = {
    dialogs: Array<DialogResponse>,
    isFetching: boolean,
    currentDialog: {
        id: number,
        userName: string,
        hasNewMessages: boolean,
        lastDialogActivityDate: string,
        lastUserActivityDate: string,
        newMessagesCount: number,
        photos: {
            small: string | null,
            large: string | null
        }
    }
}

export default dialogReducer