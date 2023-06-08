import {RootStateType} from "../store";

export const selectMessages = (state: RootStateType) => state.messages.messages
export const selectProfileFriendFullName = (state: RootStateType) => state.messages.profileFriend?.fullName
export const selectProfileFriendPhotosSmall = (state: RootStateType) => state.messages.profileFriend?.photos.small