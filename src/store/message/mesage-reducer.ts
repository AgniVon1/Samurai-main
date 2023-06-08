import {dialogsAPI, MessageResponse} from "../../api/dialogs/dialogs-api";
import {Dispatch} from "redux";
import {DialogIsFetching, dialogIsFetching} from "../dialog/dialog-reducer";
import {RootStateType} from "../store";
import {ProfileType} from "../profile/profile-reducer";
import {profileAPI} from "../../api/profile/profileAPI";

const SET_MESSAGES = "MESSAGES/SET_ALL_DIALOGS"
const SET_PROFILE_FRIEND = "MESSAGES/SET_PROFILE_FRIEND"
const SET_INTERLOCUTOR_ID = "MESSAGES/SET_INTERLOCUTOR_ID"

const initialState: MessagesStateType =
    {
        messages: [] as MessageResponse[],
        dialogId: 0,
        profileFriend: null,
    }

const messagesReducer = (state: MessagesStateType = initialState, action: MessagesActionType): MessagesStateType => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state, messages: [...action.messages]
            }
        case SET_PROFILE_FRIEND:
            return {
                ...state, profileFriend: {...action.profileFriend}
            }
        case SET_INTERLOCUTOR_ID:
            return {
                ...state, dialogId:action.dialogId
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
        dispatch(setDialogId(userIdFriend))
        dispatch(dialogIsFetching(false))
    }
}
export const fetchProfileFriend = (userIdFriend: number) => {
    return async (dispatch: Dispatch<DialogIsFetching | MessagesActionType>) => {
        dispatch(dialogIsFetching(true))
        const res = await profileAPI.getProfile(userIdFriend)
        dispatch(setProfileFriend(res.data))
        dispatch(dialogIsFetching(false))
    }
}
export const sendMessage = (message:string) => {
    return async (dispatch: Dispatch<DialogIsFetching | MessagesActionType>,getState : () =>  RootStateType) => {
        dispatch(dialogIsFetching(true))
        console.log(getState().messages.dialogId)
        const res = await dialogsAPI.sendMessage(getState().messages.dialogId,message)
        dispatch(dialogIsFetching(false))
    }
}

export const setMessages = (messages: MessageResponse[]) => {
    return {
        type: SET_MESSAGES,
        messages,
    } as const
}
export const setProfileFriend = (profileFriend: ProfileType) => {
    return {
        type: SET_PROFILE_FRIEND,
        profileFriend,
    } as const
}
export const setDialogId = (dialogId: number) => {
    return {
        type: SET_INTERLOCUTOR_ID,
        dialogId,
    } as const
}

export type MessagesActionType = ReturnType<typeof setMessages>
| ReturnType<typeof setDialogId>
| ReturnType<typeof setProfileFriend>

type MessagesStateType = {
    messages: Array<MessageResponse>,
    dialogId:number,
    profileFriend:ProfileType | null,
}

export default messagesReducer