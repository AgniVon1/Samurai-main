import {v1} from "uuid";
import {rerenderTree} from "../render";
export const addPost = () => {
    const  newPost = {id: v1(), message:state.profilePage.text, likeCounts: 0}
    state.profilePage.posts.push(newPost)
    rerenderTree(state)
}
export const changeText = (text:string) => {
    state.profilePage.text = text
    rerenderTree(state)
}


export const state = {
    profilePage: {
        text:"",
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

}

type messagePageType = {
    dialogs: Array<{id: string, name: string}>,
    messages: Array<{message:{id: string, text: string}}>,
}

type profilePageType = {
    text:string,
    posts: Array<{id: string, message:string, likeCounts: number}>,
}

export type StateType = {
    messagePage: messagePageType,
    profilePage: profilePageType,
    text:string
}
