

export type UsersType = {
    users: Array<UserType>,
    pageSize:number,
    totalUserCount:number,
    currentPage:number,
}

export type UserType = {
    name: string,
    id: string,
    photos: {
    small: string,
        large: string
},
    status: string,
    followed: boolean,
}

const initialUsersState: UsersType =
    {
        users: [

        ],
        pageSize:5,
        totalUserCount:40,
        currentPage:1,
    }

const FOLLOW = "USERS/FOLLOW"
const UNFOLLOW = "USERS/UNFOLLOW"
const SET_USERS = "USERS/SET_USER"
const SET_CURRENT_PAGE = "USERS/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "USERS/SET_TOTAL_USERS_COUNT"

 export type UsersActionType = ReturnType<typeof unFollowUserAC>
    | ReturnType<typeof followUserAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>


export const unFollowUserAC = (userID: string) => {
    return {type: UNFOLLOW, userID} as const
}
export const followUserAC = (userID: string) => {
    return {type: FOLLOW, userID} as const
}
export const setUsersAC = (users:Array<UserType>) => {
    return {type: SET_USERS, users} as const
}

export const setCurrentPageAC = (page:number) => {
    return {type: SET_CURRENT_PAGE, page} as const
}
export const setTotalUsersCountAC = (usersCount:number) => {
    return {type: SET_TOTAL_USERS_COUNT, usersCount} as const
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
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUserCount: action.usersCount
            }
        default:
            return state
    }
}

export default usersReducer