import {v1} from "uuid";
import {Dispatch} from "redux";
import {API} from "../api/api";
import {ActionAssure, togglelIsFetching} from "./users-reducer";

const CHANGE_TEXTAREA = "PROFILE/CHANGE-TEXTAREA"
const ADD_POST = "PROFILE/ADD-POST"
const SET_PROFILE = "PROFILE/SET-PROFILE"

 export type ProfilePageType =   {
        profile:ProfileType| null,
        text: string,
        posts: Array<{ id: string, message: string, likeCounts: number }>,
}

export type ProfileType = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null
    },
    lookingForAJob: boolean | null,
    lookingForAJobDescription: string | null,
    fullName: string| null,
    userId:number,
    photos: {
        small: string | null,
        large: string | null
    }
}

const initialProfilePageState:ProfilePageType = {
    profile: null
    /*{aboutMe: "",
        contacts: {
        facebook: "",
            website: null,
            vk: "",
            twitter: "",
            instagram: "",
            youtube: null,
            github: "",
            mainLink: null
    },
    lookingForAJob: true,
        lookingForAJobDescription: "",
        fullName: "",
        userId: 2,
        photos: {
        small: "",
            large: ""
    }
    }*/
    ,
        text: "",
        posts: [
            {id: v1(), message: "mes0", likeCounts: 0},
        ],
    }

type  ActionType = addNewPostActionType
 | changeTextNewPostActionType
 | setProfileActionType
| ActionAssure

const profileReducer = (state: ProfilePageType = initialProfilePageState, action: ActionType): ProfilePageType => {
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
        case SET_PROFILE:
            return {
                ...state,
                profile: {...action.profile}
            }
        default:
            return state
    }
}
export const setProfileTC = (userId:number) => {
    return async (dispatch : Dispatch<ActionType>) => {
        dispatch(togglelIsFetching(true))
        API.getProfile(userId).then(data => {
            dispatch(setProfile(data))
            dispatch(togglelIsFetching(false))
        })
    }
}


export type addNewPostActionType = { type: typeof ADD_POST, }
export type changeTextNewPostActionType = { type: typeof CHANGE_TEXTAREA, text: string }
export type setProfileActionType = { type: typeof SET_PROFILE, profile: ProfileType }

export const addNewPost = (): addNewPostActionType => ({type: ADD_POST})
export const changeTextNewPost = (text: string): changeTextNewPostActionType => ({type: CHANGE_TEXTAREA, text: text})
export const setProfile = (profile: ProfileType): setProfileActionType => ({type: SET_PROFILE, profile})

export default profileReducer