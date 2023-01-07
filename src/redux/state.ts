import {v1} from "uuid";


export let store = {
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
    addPost: function () {
        // @ts-ignore
        const newPost = {id: v1(), message: this._state.profilePage.text, likeCounts: 0}
        // @ts-ignore
        this._state.profilePage.posts.push(newPost)
        // @ts-ignore
        this.rerenderTree(this._state)
    },
    rerenderTree: function () {
        alert("State was changes")
    },

    subscribe: function (observer: (any: any) => void) {
        // @ts-ignore
        this.rerenderTree = observer
    },
    changeText: function (text: string) {
        // @ts-ignore
        this._state.profilePage.text = text
        // @ts-ignore
        this.rerenderTree(this._state)
    },

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
