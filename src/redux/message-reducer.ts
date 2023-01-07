import {ActionType, messagePageType} from "./state";
import {v1} from "uuid";


const SEND_NEW_MESS = "SEND-MESSAGE"
const CHANGE_TEXT_NEW_MESS = "CHANGE-NEW-MESS"

const messageReducer = (state: messagePageType, action: ActionType) => {
    const copyState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case SEND_NEW_MESS:
            const newMess =  {message: {id: v1(), text: state.textNewMess}}
            copyState.messages.push(newMess)
            return copyState
        case CHANGE_TEXT_NEW_MESS:
            copyState.textNewMess = action.textNewMess
            return copyState
        default:
            return state
    }
}

export type sendNewMessActionType = ReturnType<typeof sendNewMessAC>
export type changeTextNewMessActionType = ReturnType<typeof changeTextNewMessAC>

export const sendNewMessAC = () => {
    return {
        type: SEND_NEW_MESS,
    } as const
}

export const changeTextNewMessAC = (text: string) => {
    return {
        type: CHANGE_TEXT_NEW_MESS,
        textNewMess: text
    } as const
}

export default messageReducer