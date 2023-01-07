import {v1} from "uuid";
import {ActionType, profilePageType} from "./state";

const CHANGE_TEXTAREA = "CHANGE-TEXTAREA"
const ADD_POST = "ADD-POST"

const profileReducer = (state: profilePageType, action: ActionType) => {
    const copyState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ADD_POST:
            const newPost = {id: v1(), message: state.text, likeCounts: 0}
            copyState.posts.push(newPost)
            return copyState
        case CHANGE_TEXTAREA:
            copyState.text = action.text
            return copyState
        default:
            return state
    }
}
export default profileReducer