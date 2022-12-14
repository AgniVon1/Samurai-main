import {v1} from "uuid";
import profileReducer, { addNewPostActionType, changeTextNewPostActionType} from "./profile-reducer";

import messageReducer, {changeTextNewMessActionType, sendNewMessActionType} from "./message-reducer";


export let store: StoreType = {
    _state: {
        profilePage: {
            text: "",
            posts: [
                {id: v1(), message: "mes0", likeCounts: 0},
                {id: v1(), message: "mes1", likeCounts: 0},
                {id: v1(), message: "mes2", likeCounts: 0},
                {id: v1(), message: "mes3", likeCounts: 0},
                {id: v1(), message: "mes4", likeCounts: 0},
                {id: v1(), message: "mes5", likeCounts: 0},
            ],
        },
        messagePage: {
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
        },
    },
    getState: function () {
        return this._state
    },

    _onChange: function () {
        alert("State was changes")
    },

    subscribe: function (callback: (state: StateType) => void) {
        this._onChange = callback
    },

    dispatch: function (action: ActionType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagePage = messageReducer(this._state.messagePage, action)
        this._onChange(this._state)
    }
}


export type StoreType = {
    _state: StateType,
    _onChange: (state: StateType) => void,
    subscribe: (callback: (state: StateType) => void) => void,
    getState: () => StateType,
    dispatch: (action: ActionType) => void,
}

export type ActionType = sendNewMessActionType | changeTextNewMessActionType | addNewPostActionType | changeTextNewPostActionType


export type messagePageType = {
    textNewMess: string,
    dialogs: Array<{ id: string, name: string }>,
    messages: Array<{ message: { id: string, text: string } }>,
}

export type profilePageType = {
    text: string,
    posts: Array<{ id: string, message: string, likeCounts: number }>,
}

export type StateType = {
    messagePage: messagePageType,
    profilePage: profilePageType,
}
