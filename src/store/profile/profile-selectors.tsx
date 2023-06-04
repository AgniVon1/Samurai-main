import {RootStateType} from "../store";

export const selectProfile = (state: RootStateType) => state.profilePage.profile
export const selectProfileStatus = (state: RootStateType) => state.profilePage.status
export const selectProfilePosts = (state: RootStateType) => state.profilePage.posts