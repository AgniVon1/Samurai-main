import {v1} from "uuid";
import {Dispatch} from "redux";
import {API, profileAPI} from "../api/api";
import {ActionAssure, togglelIsFetching} from "./users-reducer";

const ADD_POST = "PROFILE/ADD-POST"
const SET_PROFILE = "PROFILE/SET-PROFILE"
const SET_STATUS = "PROFILE/SET-STATUS"

 export type ProfilePageType =   {
        profile:ProfileType| null,

        posts: Array<{ id: string, message: string, likeCounts: number }>,
        status:string,

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
    ,

        posts: [
            {id: v1(), message: "mes0", likeCounts: 0},
        ],
    status:"",
    }


 export type  ProfileActionType = addNewPostActionType
 | setProfileActionType
 | ActionAssure
 | SetStatusActionType

const profileReducer = (state: ProfilePageType = initialProfilePageState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: v1(), message: action.newPost, likeCounts: 0}],

            }

        case SET_PROFILE:
            return {
                ...state,
                profile: {...action.profile}
            }
        case SET_STATUS:
            return {
                ...state,
                status:action.status,
            }
        default:
            return state
    }
}
export const setProfileTC = (userId:number) => {
    return  async (dispatch : Dispatch<ProfileActionType>) => {
         dispatch(togglelIsFetching(true))
         await API.getProfile(userId).then(res => {
            dispatch(setProfile(res.data))
            dispatch(togglelIsFetching(false))
        })
    }
}
export const getUserStatus = (userId :number) => {
    return async (dispatch:Dispatch<ProfileActionType>) =>{
        dispatch(togglelIsFetching(true))
        await profileAPI.getStatus(userId).then(res=>
          {
              dispatch(setStatus(res.data))
              dispatch(togglelIsFetching(false))
          }
        )
    }
}

export const updateUserStatus = (status :string) => {
    return async (dispatch:Dispatch<ProfileActionType>) =>{
        console.log("status res")
        dispatch(togglelIsFetching(true))
        await profileAPI.updateStatus(status).then(res=>
          {   if (res.data.resultCode === 0){
              dispatch(setStatus(status))
              console.log("status res")
          }
              dispatch(togglelIsFetching(false))
          }
        )
    }
}


export type addNewPostActionType = { type: typeof ADD_POST, newPost:string}

export type setProfileActionType = { type: typeof SET_PROFILE, profile: ProfileType }
export type SetStatusActionType = { type: typeof SET_STATUS, status: string }

export const addNewPost = (newPost:string): addNewPostActionType => ({type: ADD_POST,newPost})

export const setProfile = (profile: ProfileType): setProfileActionType => ({type: SET_PROFILE, profile})
export const setStatus = (status:string):SetStatusActionType => ({
    type:SET_STATUS,status
})
export default profileReducer