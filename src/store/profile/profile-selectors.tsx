import {RootStateType} from "../store";

export const selectProfile = (state: RootStateType) => state.profilePage.profile
export const selectUserId = (state: RootStateType) => state.profilePage.profile?.userId
export const selectProfileStatus = (state: RootStateType) => state.profilePage.status
export const selectProfilePosts = (state: RootStateType) => state.profilePage.posts
export const selectProfileFullName = (state: RootStateType) => state.profilePage.profile?.fullName
export const selectProfileSmallPhoto = (state: RootStateType) => state.profilePage.profile?.photos.small