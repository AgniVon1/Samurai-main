import {chatAPI, ChatMessageAPIType, StatusType} from "../../api/chat/chat-api";
import {Action, Dispatch} from "redux";
import {FormAction} from "redux-form";
import {v1} from "uuid";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../store";

type ChatMessageType = ChatMessageAPIType & { id: string }


const MESSAGES_RECEVIED = 'chat/MESSAGES_RECEVIED'
const STATUS_CHANGED = 'chat/STATUS_CHANGED'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ChatActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEVIED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}


export const messagesReceived = (messages: ChatMessageAPIType[]) => ({
    type: MESSAGES_RECEVIED, payload: {messages}
} as const)

export const statusChanged = (status: StatusType) => ({
    type: STATUS_CHANGED, payload: {status}
} as const)


let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch<ChatActionsType>) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch<ChatActionsType>) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = () => async (dispatch: Dispatch<ChatActionsType>) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

}
export const stopMessagesListening = () => async (dispatch: Dispatch<ChatActionsType>) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string) => async (dispatch: Dispatch<ChatActionsType>) => {
    chatAPI.sendMessage(message)
}


export default chatReducer

export type InitialStateType = typeof initialState;
export type ChatActionsType = ReturnType<typeof messagesReceived> |
    ReturnType<typeof statusChanged>
type ThunkType = BaseThunkType<ChatActionsType | FormAction>
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, RootStateType, unknown, A>
