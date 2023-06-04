import {v1} from "uuid";
import {CombinedState, Dispatch} from "redux";
import {API, profileAPI, ResultCodesEnum} from "../api/api";
import {ActionAssure, togglelIsFetching} from "./users-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppThunkDispatch, RootStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {AppActionType, setErrorMessage} from "./app-reducer";

const ADD_POST = "PROFILE/ADD-POST"
const SET_PROFILE = "PROFILE/SET-PROFILE"
const SET_STATUS = "PROFILE/SET-STATUS"
const UPDATE_USER_PHOTO = "PROFILE/UPDATE_USER_PHOTO"

export type ProfilePageType = {
    profile: ProfileType | null,
    posts: Array<{ id: string, message: string, likeCounts: number }>,
    status: string,

}
export type ContactsType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
}
export type ProfileType = {
    aboutMe: string ,
    contacts: ContactsType,
    lookingForAJob: boolean ,
    lookingForAJobDescription: string ,
    fullName: string,
    userId: number,
    photos: {
        small: string | null,
        large: string | null
    }
}

const initialProfilePageState: ProfilePageType = {
    profile: null,
    posts: [
        {id: v1(), message: "mes0", likeCounts: 0},
    ],
    status: "",
}


export type  ProfileActionType = AddNewPostActionType
    | SetProfileActionType
    | ActionAssure
    | SetStatusActionType
    | UpdateUserSmallPhotoActionType

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
                status: action.status,
            }
        case UPDATE_USER_PHOTO: {
            return { ...state, profile: {...state.profile!, photos: {...state.profile!.photos, small: action.small} }}
        }
        default:
            return state
    }
}
export const fetchProfile = (userId: number) => {
    return async (dispatch: Dispatch<ProfileActionType>) => {
        dispatch(togglelIsFetching(true))
        const res = await API.getProfile(userId)
        dispatch(setProfile(res.data))
        dispatch(togglelIsFetching(false))
    }
}
export const fetchStatus = (userId: number) => {
    return async (dispatch: Dispatch<ProfileActionType>) => {
        dispatch(togglelIsFetching(true))
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res.data))
        dispatch(togglelIsFetching(false))
    }
}
export const updateUserStatus = (status: string) => {
    return async (dispatch: Dispatch<ProfileActionType>) => {
        dispatch(togglelIsFetching(true))
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
        dispatch(togglelIsFetching(false))
    }
}


export const updateUserPhoto = (photoFile: File) => {
    return (dispatch:AppThunkDispatch ,getState: () => CombinedState<RootStateType>) => {
        const userId = getState().auth.id;
        profileAPI.updateUserPhoto(photoFile)
            .then(data => {
                dispatch(setErrorMessage(null))
                if (data.data.resultCode === ResultCodesEnum.Success) {
                    dispatch(updateUserSmallPhoto(data.data.data.photos.small))
                    dispatch(fetchProfile(userId));
                }
                if (data.data.resultCode === ResultCodesEnum.Error ) {
                    dispatch(setErrorMessage(data.data.messages[0]))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export type FormDataType = {
    aboutMe: string;
    lookingForAJobDescription: string
    fullName: string
}

export const updateUserProfile = (profile: FormDataType) =>
    (dispatch: ThunkDispatch<RootStateType, unknown, ReturnType<typeof stopSubmit>>,
     getState: () => CombinedState<RootStateType>) => {
        const userId = getState().auth.id;
        return profileAPI.updateUserProfile(profile)
            .then(data => {
                dispatch(setErrorMessage(null))
                if (data.resultCode === ResultCodesEnum.Success && userId) {
                    dispatch(fetchProfile(userId));
                }
                if (data.resultCode === ResultCodesEnum.Error ) {
                    dispatch(setErrorMessage(data.messages[0]))
                    dispatch(stopSubmit('profileDataForm', {_error: data.messages[0]}));
                    return Promise.reject(data.messages[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

export type AddNewPostActionType = { type: typeof ADD_POST, newPost: string }
export type SetProfileActionType = { type: typeof SET_PROFILE, profile: ProfileType }
export type SetStatusActionType = { type: typeof SET_STATUS, status: string }
export type UpdateUserSmallPhotoActionType = { type: typeof UPDATE_USER_PHOTO, small: string }

export const addNewPost = (newPost: string): AddNewPostActionType => ({type: ADD_POST, newPost})
export const setProfile = (profile: ProfileType): SetProfileActionType => ({type: SET_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const updateUserSmallPhoto = ( small: string):UpdateUserSmallPhotoActionType => ({type: UPDATE_USER_PHOTO, small})

export default profileReducer