import {v1} from "uuid";
import {CombinedState, Dispatch} from "redux";

import {TogglelIsFetching, togglelIsFetching} from "../users/users-reducer";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {setErrorMessage} from "../app/app-reducer";
import {profileAPI} from "../../api/profile/profileAPI";
import {AppThunkDispatch, RootStateType} from "../store";
import {ResultCodesEnum} from "../../api/types/types";

const ADD_POST = "PROFILE/ADD-POST"
const ADD_LIKE = "PROFILE/ADD-LIKE"
const SET_PROFILE = "PROFILE/SET-PROFILE"
const SET_STATUS = "PROFILE/SET-STATUS"
const UPDATE_USER_PHOTO = "PROFILE/UPDATE_USER_PHOTO"

const initialProfilePageState: ProfilePageType = {
    profile: null,
    posts: [
        {
            id: v1(),
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ipsum",
            likeCounts: 56,
            isMyLike: false,
            date: "12.03.18 15:54"
        }, {
            id: v1(),
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis ipsum sit amet semper faucibus.",
            likeCounts: 56,
            isMyLike: false,
            date: "12.03.18 15:54"
        }, {
            id: v1(),
            likeCounts: 56,
            isMyLike: false,
            date: "12.03.18 15:54",
            message: "This post id is 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Nullam facilisis ipsum sit amet semper faucibus. Aenean eu vestibulum orci, nec vestibulum nisi. " +
                "Proin dapibus diam neque, sed malesuada ex euismod et. Quisque ex risus, consequat sit amet mi ac," +
                " lobortis tincidunt erat. Donec acc umsan quis magna sed feugiat. Nulla elementum metus id odio" +
                " dapibus consectetMaecenas vitae nibh in dolor malesuada bibendum aliquam ac leo.eu congue nulla " +
                "feugiat sit amet. Duis at aliquet lacus.",
        }
    ],
    status: "",
}

const profileReducer = (state: ProfilePageType = initialProfilePageState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [ {id: v1(),
                    message: action.newPost,
                    isMyLike:false,
                    likeCounts: 0,
                    date: new Intl.DateTimeFormat('en-GB', {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }).format(new Date())},...state.posts,]

            }
        case ADD_LIKE:
            const newPosts = state.posts.map(p => p.id !== action.id ? p : {
                ...p,
                isMyLike: !p.isMyLike
            })
            return {...state, posts: [...newPosts]}
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
        const res = await profileAPI.getProfile(userId)
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

export const addNewPost = (newPost: string): AddNewPostActionType => ({type: ADD_POST, newPost})
export const addLikePost = (id: string): AddLikePostActionType => ({type: ADD_LIKE, id})
export const setProfile = (profile: ProfileType): SetProfileActionType => ({type: SET_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const updateUserSmallPhoto = ( small: string):UpdateUserSmallPhotoActionType => ({type: UPDATE_USER_PHOTO, small})

export type  ProfileActionType = AddNewPostActionType
    | AddLikePostActionType
    | SetProfileActionType
    | SetStatusActionType
    | UpdateUserSmallPhotoActionType
    | TogglelIsFetching

export type AddNewPostActionType = { type: typeof ADD_POST, newPost: string }
export type AddLikePostActionType = { type: typeof ADD_LIKE, id: string }
export type SetProfileActionType = { type: typeof SET_PROFILE, profile: ProfileType }
export type SetStatusActionType = { type: typeof SET_STATUS, status: string }
export type UpdateUserSmallPhotoActionType = { type: typeof UPDATE_USER_PHOTO, small: string }

export type ProfilePageType = {
    profile: ProfileType | null,
    posts: Array<{ id: string, message: string, likeCounts: number ,isMyLike:boolean,date:string}>,
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
export default profileReducer