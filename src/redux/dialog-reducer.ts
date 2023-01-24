import {ActionType, DialogPageType} from "./state";
import {v1} from "uuid";



const SEND_NEW_MESS = "SEND-MESSAGE"
const CHANGE_TEXT_NEW_MESS = "CHANGE-NEW-MESS"

const initialMessagesPageState: DialogPageType =
    {
        textNewMess: "",
        dialogs: [
            {id: v1(), name: "Mark"},
            {id: v1(), name: "Tom"},
            {id: v1(), name: "Mercava"},
        ],
        messages: [
            {message: {id: v1(), text: "cooбщение0"}},
            {message: {id: v1(), text: "cooбщение1"}},
            {message: {id: v1(), text: "cooбщение2"}},
            {message: {id: v1(), text: "cooбщение3"}},
            {message: {id: v1(), text: "cooбщение4"}},
            {message: {id: v1(), text: "cooбщение5"}},
        ],
    }


const dialogReducer = (state: DialogPageType = initialMessagesPageState, action: ActionType): DialogPageType => {
    switch (action.type) {
        case SEND_NEW_MESS:
            return {
                ...state,
                textNewMess: "",
                dialogs: [...state.dialogs],
                messages:
                    [...state.messages.map(m => ({...m})),
                        {message: {id: v1(), text: state.textNewMess}}],
            }
        case CHANGE_TEXT_NEW_MESS:
            return {
                ...state,
                textNewMess: action.textNewMess,
                dialogs: [...state.dialogs],
                messages: state.messages.map(m => ({...m})),
            }
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

export default dialogReducer