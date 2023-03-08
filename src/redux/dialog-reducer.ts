
import {v1} from "uuid";



const SEND_NEW_MESS = "SEND-MESSAGE"


export type DialogPageType = {
    dialogs: Array<DialogsArray>
    messages: Array<MessagesArray>
}


export type DialogsArray = {
    id: string
    name: string
}
export type MessagesArray = {
    id: string
    text: string
}
type InitStateType = DialogPageType

const initialMessagesPageState: InitStateType =
    {

        dialogs: [
            {id: v1(), name: 'Neil Tunicliff'},
            {id: v1(), name: 'Craig Lee Scott'},
            {id: v1(), name: 'Ali Clarkson'},
            {id: v1(), name: 'Thomas Remvik Aasen'},
            {id: v1(), name: 'Damon Watson'}
        ] as Array<DialogsArray>,
        messages: [
            {id: v1(), text: 'Hello, Neil Tunicliff'},
            {id: v1(), text: 'Hello, Craig Lee Scott'},
            {id: v1(), text: 'Hello, Ali Clarkson'},
            {id: v1(), text: 'Hello, Thomas Remvik Aasen'},
            {id: v1(), text: 'Hello, Damon Watson'}
        ] as Array<MessagesArray>,
    }

export type DialogActionType = sendNewMessActionType
const dialogReducer = (state: InitStateType = initialMessagesPageState, action: DialogActionType): DialogPageType => {
    switch (action.type) {
        case SEND_NEW_MESS:
            return {
                ...state,
                dialogs: [...state.dialogs],
                messages:
                    [...state.messages,
                         {id: v1(), text: action.newMess}],
            }
        default:
            return state
    }
}

export type sendNewMessActionType = ReturnType<typeof sendNewMessAC>


export const sendNewMessAC = (newMess:string) => {
    return {
        type: SEND_NEW_MESS,newMess
    } as const
}

export default dialogReducer