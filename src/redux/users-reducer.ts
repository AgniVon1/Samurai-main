import {v1} from "uuid";

export type UsersType = {
    users: Array<UserType>
}

export type UserType = {
    name: string,
    id: string,
    photos: {
    small: string,
        large: string
},
    status: string,
    followed: boolean
}

const initialUsersState: UsersType =
    {
        users: [

        ]

    }

const FOLLOW = "USERS/FOLLOW"
const UNFOLLOW = "USERS/UNFOLLOW"
const SET_USERS = "USERS/SET_USER"

 export type UsersActionType = ReturnType<typeof unFollowUserAC>
    | ReturnType<typeof followUserAC>
    | ReturnType<typeof setUsersAC>


export const unFollowUserAC = (userID: string) => {
    return {type: UNFOLLOW, userID} as const
}
export const followUserAC = (userID: string) => {
    return {type: FOLLOW, userID} as const
}
export const setUsersAC = (users:Array<UserType>) => {
    return {type: SET_USERS, users} as const
}

const usersReducer = (state: UsersType = initialUsersState, action: UsersActionType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    (u) => (action.userID === u.id) ?
                        {...u, followed: true} :
                        u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(
                    (u) => (action.userID === u.id) ?
                        {...u, followed: false} :
                        u)
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users,...action.users]
            }
        default:
            return state
    }
}

export default usersReducer