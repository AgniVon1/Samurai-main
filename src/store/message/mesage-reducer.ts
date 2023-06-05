import {dialogsAPI, MessageResponse} from "../../api/dialogs/dialogs-api";
import {Dispatch} from "redux";
import {DialogIsFetching, dialogIsFetching} from "../dialog/dialog-reducer";
import {RootStateType} from "../store";

const SET_MESSAGES = "MESSAGES/SET_ALL_DIALOGS"
const SET_INTERLOCUTOR_ID = "MESSAGES/SET_INTERLOCUTOR_ID"

const initialState: MessagesStateType =
    {
        messages: [] as MessageResponse[],
        interlocutorId: 0,
    }

const messagesReducer = (state: MessagesStateType = initialState, action: MessagesActionType): MessagesStateType => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state, messages: [...action.messages]
            }
        case SET_INTERLOCUTOR_ID:
            return {
                ...state, interlocutorId:action.interlocutorId
            }
        default:
            return state
    }
}

export const fetchMessages = (userIdFriend: number) => {
    return async (dispatch: Dispatch<DialogIsFetching | MessagesActionType>) => {
        dispatch(dialogIsFetching(true))
        const res = await dialogsAPI.getAllMessagesFromFriend(userIdFriend)
        dispatch(setMessages(res.data.items))
        dispatch(setInterlocutorId(userIdFriend))
        dispatch(dialogIsFetching(false))
    }
}
export const sendMessage = (message:string) => {
    return async (dispatch: Dispatch<DialogIsFetching | MessagesActionType>,getState : () =>  RootStateType) => {
        dispatch(dialogIsFetching(true))
        console.log(getState().messages.interlocutorId)
        const res = await dialogsAPI.sendMessage(getState().messages.interlocutorId,message)
        dispatch(dialogIsFetching(false))
    }
}

export const setMessages = (messages: MessageResponse[]) => {
    return {
        type: SET_MESSAGES,
        messages,
    } as const
}
export const setInterlocutorId = (interlocutorId: number) => {
    return {
        type: SET_INTERLOCUTOR_ID,
        interlocutorId,
    } as const
}

export type MessagesActionType = ReturnType<typeof setMessages>
| ReturnType<typeof setInterlocutorId>

type MessagesStateType = {
    messages: Array<MessageResponse>,
    interlocutorId:number,
}

export default messagesReducer