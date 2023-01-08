import {v1} from "uuid";
import {ActionType, profilePageType} from "./state";

const CHANGE_TEXTAREA = "CHANGE-TEXTAREA"
const ADD_POST = "ADD-POST"

const initialProfilePageState:profilePageType =
    {
        text: "",
        posts: [
            {id: v1(), message: "mes0", likeCounts: 0},
            {id: v1(), message: "mes1", likeCounts: 0},
            {id: v1(), message: "mes2", likeCounts: 0},
            {id: v1(), message: "mes3", likeCounts: 0},
        ],
    }


const profileReducer = (state: profilePageType = initialProfilePageState, action: ActionType): profilePageType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: state.text, likeCounts: 0}],
                text: ""
            }
        case CHANGE_TEXTAREA:
            return {
                ...state,
                posts: [...state.posts],
                text: action.text
            }
        default:
            return state
    }
}


export type addNewPostActionType = { type: typeof ADD_POST, }
export type changeTextNewPostActionType = { type: typeof CHANGE_TEXTAREA, text: string }

export const addNewPostAC = (): addNewPostActionType => ({type: ADD_POST})
export const changeTextNewPostAC = (text: string): changeTextNewPostActionType => ({type: CHANGE_TEXTAREA, text: text})

export default profileReducer