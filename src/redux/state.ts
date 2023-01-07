import {v1} from "uuid";
import {ActionTypes} from "redux-form";


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

        // @ts-ignore

        return this._state
    },
    _addPost: function () {
        // @ts-ignore
        const newPost = {id: v1(), message: this._state.profilePage.text, likeCounts: 0}
        // @ts-ignore
        this._state.profilePage.posts.push(newPost)
        // @ts-ignore
        this._onChange(this._state)
    },
    _onChange: function (state:StateType) {
        alert("State was changes")
    },

    subscribe: function (callback: (state:StateType) => void) {
        this._onChange = callback
    },
    _changeText: function (text: string) {
        // @ts-ignore
        this._state.profilePage.text = text
        // @ts-ignore
        this._onChange(this._state)
    },
    dispatch: function(action:ActionType){
        switch (action.type) {
            case "ADD-POST":
                this._addPost()
                break;
            case "CHANGE-TEXTAREA":
                console.log(this)
                this._changeText(action.text)
                break;
        }
    }
}


export type StoreType = {
    _state: StateType,
    _addPost: () => void,
    _onChange: (state:StateType) => void,
    _changeText: (text: string) => void
    subscribe: (callback: (state:StateType) => void) => void,
    getState: () => StateType,
    dispatch: (action: ActionType) => void,
}

export type ActionType = addPostActionType | changeTextActionType
export type addPostActionType = ReturnType<typeof addPostAC>
export type changeTextActionType = ReturnType<typeof changeTextAC>

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
