import {v1} from "uuid";
import profileReducer from "./profile-reducer";


export let store : StoreType= {
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

    subscribe: function (callback: (state:StateType) => void) {
        this._onChange = callback
    },

    dispatch: function(action:ActionType){
        this._state.profilePage = profileReducer(this._state.profilePage,action)
        this._onChange(this._state)
    }
}


export type StoreType = {
    _state: StateType,
    _onChange: (state:StateType) => void,
    subscribe: (callback: (state:StateType) => void) => void,
    getState: () => StateType,
    dispatch: (action: ActionType) => void,
}

export type ActionType = profileActionType


export type profileActionType = addPostActionType | changeTextActionType
 type addPostActionType = ReturnType<typeof addPostAC>
 type changeTextActionType = ReturnType<typeof changeTextAC>

export const addPostAC = () => {
    return { type:"ADD-POST",
    }as const
}

export const changeTextAC = (text: string) => {
    return { type:"CHANGE-TEXTAREA",
        text: text
    } as const
}

export type messagePageType = {
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
